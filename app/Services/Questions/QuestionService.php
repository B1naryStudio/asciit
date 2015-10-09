<?php

namespace App\Services\Questions;

use App\Events\QuestionWasUpdated;
use App\Repositories\Criteria\CurrentUserCriteria;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Criteria\RelationLikeCriteria;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use App\Repositories\Contracts\QuestionRepository;
use App\Repositories\Contracts\AnswerRepository;
use App\Repositories\Contracts\FolderRepository;
use App\Repositories\Exceptions\RepositoryException;
use App\Repositories\Contracts\TagRepository;
use App\Repositories\Contracts\VoteRepository;
use App\Repositories\Criteria\InCriteria;
use App\Repositories\Criteria\TagQuestionCriteria;
use App\Services\Questions\Exceptions\QuestionServiceException;
use App\Repositories\Contracts\CommentRepository;
use Illuminate\Support\Facades\Event;
use App\Events\QuestionWasAdded;
use App\Events\QuestionWasRemoved;
use App\Events\AnswerWasAdded;
use App\Events\AnswerWasUpdated;
use App\Events\AnswerWasRemoved;
use App\Events\CommentWasAdded;
use App\Events\CommentWasUpdated;
use App\Events\CommentWasRemoved;
use App\Events\VoteWasAdded;
use App\Events\VoteWasRemoved;
use App\Events\FolderWasAdded;
use App\Events\FolderWasUpdated;
use App\Events\FolderWasRemoved;
use App\Events\TagWasAdded;
use App\Repositories\Entities\Answer;
use App\Repositories\Entities\Comment;
use App\Repositories\Entities\Question;
use App\Repositories\Entities\Vote;
use App\Repositories\Entities\Folder;

class QuestionService implements QuestionServiceInterface
{
    private $questionRepository;
    private $answerRepository;
    private $folderRepository;
    private $tagRepository;
    private $voteRepository;
    private $commentRepository;

    public function __construct(
        QuestionRepository $questionRepository,
        AnswerRepository $answerRepository,
        FolderRepository $folderRepository,
        TagRepository $tagRepository,
        VoteRepository $voteRepository,
        CommentRepository $commentRepository
    ) {
        $this->questionRepository = $questionRepository;
        $this->answerRepository = $answerRepository;
        $this->folderRepository = $folderRepository;
        $this->tagRepository = $tagRepository;
        $this->voteRepository = $voteRepository;
        $this->commentRepository = $commentRepository;
    }

    public function createQuestion(array $data)
    {
        try {
            $this->attachFolderId($data);
            $question = $this->questionRepository->create($data);

            if (!empty($data['tag'])) {
                $this->attachTagsToQuestion($question, $data['tag']);
            }
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new QuestionWasAdded(
            $this->getQuestionById($question->id)
        ));

        return $question;
    }

    public function updateQuestion(array $data, $id)
    {
        try {
            $this->attachFolderId($data);
            $question = $this->questionRepository->update($data, $id);
            $this->updateQuestionTags($question, $data['tag']);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new QuestionWasUpdated(
            $this->getQuestionById($question->id)
        ));

        return $question;
    }

    protected function attachFolderId(array &$data)
    {
        $folder = $this->folderRepository->firstWhere([
            'title' => $data['folder']
        ]);

        $data['folder_id'] = $folder->id;
    }

    /**
     * @param Question $question
     * @param array $newTagsTitles
     */
    protected function attachTagsToQuestion(
        Question $question,
        array $newTagsTitles
    ) {
        // Retreiving all tags with titles like in the list
        $existantTags = $this->tagRepository->getByCriteria(
            new InCriteria('title', $newTagsTitles)
        );

        /*
         * Creating tags if nesessary
         */
        // Creating array ['tagTitle' => tag] for all tags to relate
        $tagsByTitle = [];

        foreach ($existantTags as $tag) {
            $tagsByTitle[$tag->title] = $tag;
        }

        $tagsToCreate = [];

        foreach ($newTagsTitles as $title) {
            if (empty($tagsByTitle[$title])) {
                $tagsToCreate[] = ['title' => $title];
            }
        }

        // Creating tags if it not exist yet
        $createdTags = [];

        if (!empty($tagsToCreate)) {
            $createdTags = $this->tagRepository->createSeveral($tagsToCreate);

            // Firing events for creating every tag
            foreach ($createdTags as $tag) {
                $tag->question_count = 1;
                Event::fire(new TagWasAdded($tag));
                unset ($tag->question_count);
            }
        }

        $tags = array_merge($existantTags->all(), $createdTags);

        /*
         * Bind all the tags with the question
         */
        if (!empty($tags)) {
            $this->questionRepository->relationsAdd($question, 'tags', $tags);
        }
    }

    /**
     * @param Question $question
     * @param array $tagTitlesTarget
     */
    public function updateQuestionTags(
        Question $question,
        array $tagTitlesTarget
    ) {
        // Retreive all already related with question tags
        $questionTags = $this->tagRepository->getByCriteria(
            new TagQuestionCriteria($question->id)
        );

        /*
         * Detach if necessary
         */
        $tagsIdsToDetach = [];

        // Remove all question relations with tags if there no tags anymore
        if (empty($tagTitlesTargetList)) {
            $tagsIdsToDetach = $questionTags->pluck('id')->all();
            $this->tagRepository->relationsDestroy(
                $question,
                'tags',
                $tagsIdsToDetach
            );
            return;
        } else {
            // If tag is related but isn't exist in target list - to detaching list
            $questionTags->map(
                function ($item) use ($tagTitlesTargetList, &$tagsIdsToDetach) {
                    if (!in_array($item->title, $tagTitlesTargetList)) {
                        $tagsIdsToDetach[] = $item->id;
                    }
                }
            );

            // Detaching
            if (!empty($tagsIdsToDetach)) {
                $this->tagRepository->relationsDestroy(
                    $question,
                    'tags',
                    $tagsIdsToDetach
                );
            }
        }

        /*
         * Attach if necessary
         */
        $titlesToAttach = [];

        // If no attached tags with this title, add title to the array for attach
        foreach ($tagTitlesTargetList as $title) {
            if ($questionTags->where('title', $title)->isEmpty()) {
                $titlesToAttach[] = $title;
            }
        }

        // Attaching
        if (!empty($titlesToAttach)) {
            $this->attachTagsToQuestion($question, $titlesToAttach);
        }
    }

    /**
     * @param int $id
     * @return Question
     */
    public function getQuestionById($id)
    {
        try {
            $question = $this->questionRepository
                ->findWithRelations(
                    $id,
                    ['user', 'folder', 'tags', 'comments.user']
                );
            $tmp = $this->voteRepository->findWhere([
                'q_and_a_id' => $id,
                'user_id' => Auth::user()->id
            ]);
            $question->vote = $tmp->first();;
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage() . ' No such question',
                null,
                $e
            );
        }

        return $question;
    }

    /**
     * @param string $slug
     * @return Question
     */
    public function getQuestionBySlug($slug)
    {
        try {
            $question = $this->questionRepository
                ->findByFieldWithRelations(
                    'slug',
                    $slug,
                    ['user', 'folder', 'tags', 'comments.user']
                )->first();
            $tmp = $this->voteRepository->findWhere([
                'q_and_a_id' => $question->id,
                'user_id' => Auth::user()->id
            ]);
            $question->vote = $tmp->first();
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage() . ' No such question',
                null,
                $e
            );
        }

        return $question;
    }

    /**
     * @param int|null $pageSize
     * @param array $data
     * @return LengthAwarePaginator
     */
    public function getQuestions($pageSize = null, $data = array())
    {
        if (!empty($data['tag'])) {
            $this->questionRepository->pushCriteria(
                new RelationLikeCriteria('tags', 'title', $data['tag'])
            );
        } elseif (!empty($data['folder'])) {
            $this->questionRepository->pushCriteria(
                new RelationLikeCriteria('folder', 'title', $data['folder'])
            );
        }

        $questions = $this->questionRepository
            ->with(['user', 'folder', 'tags'])
            ->paginate($pageSize);
        return $questions;
    }

    /**
     * @param int $id
     * @return int
     */
    public function removeQuestion($id)
    {
        try {
            $questionTags = $this->tagRepository->getByCriteria(
                new TagQuestionCriteria($id)
            );
            $tagsIdsToDetach = $questionTags->pluck('id')->all();
            $question = $this->questionRepository->delete($id);
            if (!empty($tagsIdsToDetach)) {
                $this->tagRepository->relationsDestroy(
                    $question,
                    'tags',
                    $tagsIdsToDetach
                );
            }
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new QuestionWasRemoved($question));
        return $question;
    }

    /**
     * @param int $question_id
     * @return Collection
     */
    public function getAnswersOfQuestion($question_id)
    {
        try {
            $answers = $this->answerRepository
                ->findByFieldWithRelations(
                    'question_id',
                    $question_id,
                    ['user', 'comments.user', 'votes']
                );
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage() . ' No such question',
                null,
                $e
            );
        }

        foreach ($answers as $answer) {
            $votes = collect($answer->votes);
            unset($answer->votes);
            $this->attachVotesShortInfo($answer, $votes);
        }

        return $answers;
    }

    // Attaching likes in easy obvious one-query way.
    private function attachVotesShortInfo(
        Answer &$model,
        \Illuminate\Support\Collection $votes
    ) {
        $likes = $votes->whereLoose('sign', 1)->count();
        $dislikes = $votes->count() - $likes;
        $rating = $likes - $dislikes;
        $users_vote = $votes->where('user_id', Auth::user()->id)->first();

        $model->vote_likes = $likes;
        $model->vote_dislikes = $dislikes;
        $model->vote_value = $rating;

        if ($users_vote) {
            $model->vote = $users_vote;
        }
    }

    /**
     * @param array $data
     * @return Vote
     */
    public function addVote(array $data)
    {
        $data['user_id'] = Auth::user()->id;

        $same = $this->voteRepository->firstWhere([
            'user_id'    => $data['user_id'],
            'q_and_a_id' => $data['q_and_a_id'],
        ]);

        // If this like is unique
        if (!$same) {
            $vote = $this->voteRepository->create($data);
        } else {
            throw new QuestionServiceException('User can\'t vote twice!');
        }

        $vote = $this->voteRepository->findWithRelations(
            $vote->id,
            [
                'user',
                'question.user',
                'answer.question'
            ]
        );

        Event::fire(new VoteWasAdded($vote));
        return $vote;
    }

    /**
     * @param int $vote_id
     * @return Vote
     * @throws QuestionServiceException
     */
    public function removeVote($vote_id)
    {
        try {
            $vote = $this->voteRepository->findWithRelations(
                $vote_id,
                [
                    'user',
                    'question.user',
                    'answer.question'
                ]
            );
            $vote->delete($vote_id);

        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage() . ' Can\'t unlike it.',
                null,
                $e
            );
        }

        Event::fire(new VoteWasRemoved($vote));
        return $vote;
    }

    /**
     * @param array $data
     * @param int $question_id
     * @return Answer
     */
    public function createAnswer(array $data, $question_id)
    {
        $data['user_id'] = Auth::user()->id;

        try {
            $new = $this->answerRepository->create($data);
            $answer = $this->answerRepository->withRelationCount()
                ->findWithRelations($new->id, ['user', 'question.user']);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage() . ' No such answer',
                null,
                $e
            );
        }

        Event::fire(new AnswerWasAdded($answer));
        return $answer;
    }

    /**
     * @param array $data
     * @param int $answer_id
     * @return Answer
     */
    public function updateAnswer(array $data, $answer_id)
    {
        try {
            $answer = $this->answerRepository->update($data, $answer_id);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new AnswerWasUpdated($answer));
        return $answer;
    }

    /**
     * @param int $question_id
     * @param int $answer_id
     * @param bool $closing_value
     * @return bool
     */
    public function handleQuestionClosing(
        $question_id,
        $answer_id,
        $closing_value
    ) {
        try {
            if ($closing_value == true) {
                $previous = $this->answerRepository->firstWhere([
                    'question_id' => $question_id,
                    'closed'      => true
                ]);

                if ($previous) {
                    // Cancel a previous choise if it exists
                    $answer = $this->answerRepository
                        ->setProtectedProperty($previous, 'closed', false);
                } else {
                    // If there wasn't a best answer yet, mark question as closed
                    $question = $this->questionRepository
                        ->setProtectedPropertyById($question_id, 'closed', true);
                }
            } else {
                // If we are removing a mark of the best answer, a question has
                $question = $this->questionRepository
                    ->setProtectedPropertyById($question_id, 'closed', false);
            }

            // Update an answer closed value
            $answer = $this->answerRepository
                ->setProtectedPropertyById($answer_id, 'closed', $closing_value);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        // If something changed in question
        if (isset($question)) {
            Event::fire(new QuestionWasUpdated($question));
        }

        Event::fire(new AnswerWasUpdated($answer));

        return $closing_value;
    }

    /**
     * @param int $id
     * @return int
     */
    public function removeAnswer($id)
    {
        try {
            $answer = $this->answerRepository->delete($id);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new AnswerWasRemoved($answer));
        return $answer;
    }

    public function getFolders()
    {
        try {
            $folder = $this->folderRepository->all();
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $folder;
    }

    // Folders
    /**
     * @param array $data
     * @return Folder
     */
    public function createFolder(array $data)
    {
        try {
            $folder = $this->folderRepository->create($data);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new FolderWasAdded($folder));
        return $folder;
    }

    /**
     * @param array $data
     * @param int $id
     * @return Folder
     */
    public function updateFolder(array $data, $id)
    {
        try {
            $folder = $this->folderRepository->update($data, $id);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new FolderWasUpdated($folder));
        return $folder;
    }

    /**
     * @param int|null $pageSize
     * @return Folder
     */
    public function getFoldersForCrud($pageSize = null)
    {
        try {
            $folder = $this->folderRepository
                ->paginate($pageSize);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $folder;
    }

    /**
     * @param int $id
     * @return int
     */
    public function removeFolder($id)
    {
        try {
            $folder = $this->folderRepository->delete($id);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new FolderWasRemoved($folder));
        return $folder;
    }

    /**
     * @param int|null $pageSize
     * @return LengthAwarePaginator
     */
    public function getTags($pageSize = null)
    {
        try {
            $tags = $this->tagRepository->paginate($pageSize);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $tags->items();
    }

    /**
     * @param array $data
     * @param int $question_id
     * @return Comment
     */
    public function createComment(array $data, $question_id)
    {
        $data['user_id'] = Auth::user()->id;

        $new = $this->commentRepository->create($data);

        try {
            $comment = $this->commentRepository
                ->findWithRelations($new->id, ['user', 'question.user', 'answer.question']);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage() . ' No such answer',
                null,
                $e
            );
        }

        Event::fire(new CommentWasAdded($comment));

        return $comment;
    }

    /**
     * @param array $data
     * @param int $id
     * @return Comment
     */
    public function updateComment(array $data, $id)
    {
        try {
            $comment = $this->commentRepository->update($data, $id);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new CommentWasUpdated($comment));
        return $comment;
    }

    /**
     * @param int $id
     * @return int
     */
    public function removeComment($id)
    {
        try {
            $comment = $this->commentRepository->delete($id);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new CommentWasRemoved($comment));
        return $comment;
    }

    /**
     * @param int|null $pageSize
     * @param string $search
     * @return LengthAwarePaginator
     */
    public function getTagsPopular($pageSize = null, $search = '')
    {
        $where = [];
        if (!empty($search)) {
            $where[] = ['title', 'like', $search . '%'];
        }
        try {
            $tags = $this->tagRepository
                ->loadRelationPopularPaginate(
                    ['questions', 'questions_count'],
                    $pageSize,
                    false,
                    [],
                    $where
                );
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $tags;
    }

    /**
     * @param null|int $pageSize
     * @return LengthAwarePaginator
     */
    public function getQuestionsByUser($pageSize = null)
    {
        $this->questionRepository->pushCriteria(
            new CurrentUserCriteria(Auth::user()->id)
        );
        $questions = $this->questionRepository
            ->with(['user', 'folder', 'tags'])
            ->paginate($pageSize);
        return $questions;
    }

    /**
     * @param null|int $pageSize
     * @return LengthAwarePaginator
     */
    public function getAnswersByUser($pageSize = null)
    {
        $this->answerRepository->pushCriteria(
            new CurrentUserCriteria(Auth::user()->id)
        );
        $questions = $this->answerRepository->withRelationCount()
            ->with(['user', 'question'])
            ->paginate($pageSize);
        return $questions;
    }

    // Widgets
    /**
     * @param int|null $pageSize
     * @param array $data
     * @return array|mixed
     */
    public function getQuestionsPopular($pageSize = null, $data = array())
    {
        $where = [
            'q_and_a.question_id is not null'
        ];
        if (!empty($data['date_start'])) {
            $where[] = ['main.created_at', '>=', $data['date_start']];
        }
        if (!empty($data['date_end'])) {
            $where[] = ['main.created_at', '<=', $data['date_end']];
        }
        try {
            $questions = $this->questionRepository
                ->loadRelationPopular(
                    'answers',
                    $pageSize,
                    true,
                    ['user', 'folder'],
                    $where
                );
            $questions = $this->questionRepository
                ->setCountedFields(new Collection($questions));
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $questions;
    }

    /**
     * @param int|null $pageSize
     * @param array $data
     * @return array|mixed
     */
    public function getQuestionsUpvoted($pageSize = null, $data = array())
    {
        $where = [
            'main.question_id is null'
        ];
        if (!empty($data['date_start'])) {
            $where[] = ['main.created_at', '>=', $data['date_start']];
        }
        if (!empty($data['date_end'])) {
            $where[] = ['main.created_at', '<=', $data['date_end']];
        }
        try {
            $questions = $this->questionRepository
                ->loadRelationPopular(
                    'votes',
                    $pageSize,
                    true,
                    ['user', 'folder'],
                    $where
                );
            $questions = $this->questionRepository
                ->setCountedFields(new Collection($questions));
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $questions;
    }

    /**
     * @param int|null $pageSize
     * @param array $data
     * @return array|mixed
     */
    public function getQuestionsTopCommented($pageSize = null, $data = array())
    {
        $where = [
            'main.question_id is null'
        ];
        if (!empty($data['date_start'])) {
            $where[] = ['main.created_at', '>=', $data['date_start']];
        }
        if (!empty($data['date_end'])) {
            $where[] = ['main.created_at', '<=', $data['date_end']];
        }
        try {
            $questions = $this->questionRepository
                ->loadRelationPopular(
                    'comments',
                    $pageSize,
                    true,
                    ['user', 'folder'],
                    $where
                );
            $questions = $this->questionRepository
                ->setCountedFields(new Collection($questions));
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $questions;
    }

}

