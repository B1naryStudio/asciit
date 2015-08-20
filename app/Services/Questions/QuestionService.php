<?php
namespace App\Services\Questions;;

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
use App\Services\Questions\Exceptions\QuestionServiceException;
use App\Repositories\Contracts\CommentRepository;
use Illuminate\Support\Facades\Event;
use App\Events\QuestionWasAdded;
use App\Events\AnswerWasAdded;
use App\Events\CommentWasAdded;
use App\Events\VoteWasAdded;
use App\Events\VoteWasRemoved;

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
    
    public function createQuestion($data)
    {
        try {
            $folder = $this->folderRepository->firstOrCreate([
                'title' => $data['folder']
            ]);
            $data['folder_id'] = $folder->id;
            $question = $this->questionRepository->create($data);

            if (!empty($data['tag'])) {
                $this->tagRepository->pushCriteria(
                    new InCriteria('title', $data['tag'])
                );
                $tags = $this->tagRepository->all();
                $tmp = [];
                foreach ($tags as $tag) {
                    $tmp[$tag->title] = $tag;
                }
                $tags = [];
                $not_exist = [];
                foreach ($data['tag'] as $title) {
                    if (empty($tmp[$title])) {
                        $not_exist[] = ['title' => $title];
                    } else {
                        $tags[] = $tmp[$title];
                    }
                }
                if (!empty($not_exist)) {
                    $tags = array_merge(
                        $tags,
                        $this->tagRepository->createSeveral($not_exist)
                    );
                }
                $this->questionRepository->relationsAdd($question, 'tags', $tags);
            }
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }

        Event::fire(new QuestionWasAdded(
            $this->getQuestion($question->id)
        ));

        return $question;
    }
    
    /**
     * @param $id
     * @return \App\Repositories\Entities\Question
     */
    public function getQuestion($id)
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
     * @return Collection
     */
    public function getQuestions($pageSize = null, $data = array())
    {
        if (!empty($data['tag'])) {
            $this->questionRepository->pushCriteria(
                new RelationLikeCriteria('tags', 'title', $data['tag'])
            );
        }

        $questions = $this->questionRepository
            ->with(['user', 'folder', 'tags'])
            ->paginate($pageSize);
        return $questions;
    }

    /**
     * @param int $question_id
     * @return Collection
     */
    public function getAnswersOfQuestion($question_id)
    {
        $answers = $this->answerRepository
            ->findByFieldWithRelations(
                'question_id',
                $question_id,
                ['user', 'comments.user', 'votes']
            );

        foreach ($answers as $answer) {
            $votes = collect($answer->votes);
            unset($answer->votes);
            $this->attachVotesShortInfo($answer, $votes);
        }

        return $answers;
    }

    // Attaching likes in easy obvious one-query way.
    private function attachVotesShortInfo(&$model, $votes)
    {
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

    public function addVote($data)
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

        Event::fire(new VoteWasAdded($vote));

        return $vote;
    }

    public function removeVote($vote_id)
    {
        try {
            $vote = $this->voteRepository->delete($vote_id);
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
    
    public function createAnswer($data, $question_id)
    {
        $data['user_id'] = Auth::user()->id;

        try {
            $new = $this->answerRepository->create($data);
            $answer = $this->answerRepository->withRelationCount()
                ->findWithRelations($new->id, ['user', 'question']);
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

    public function getTags($pageSize = null)
    {
        try {
            $tags = $this->tagRepository->paginate(10);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $tags->items();
    }

    public function createComment($data, $question_id)
    {
        $data['user_id'] = Auth::user()->id;

        $new = $this->commentRepository->create($data);

        try {
            $comment = $this->commentRepository
                ->findWithRelations($new->id, ['user']);
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

    public function getTagsPopular($pageSize = null)
    {
        try {
            $tags = $this->tagRepository
                ->loadRelationPopular('questions', $pageSize);
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
                ->loadRelationPopular('answers', $pageSize, $where);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $questions;
    }

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
                ->loadRelationPopular('votes', $pageSize, $where);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $questions;
    }

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
                ->loadRelationPopular('comments', $pageSize, $where);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $questions;
    }

    public function removeFolder($id)
    {
        try {
            $this->folderRepository->delete($id);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
    }

    public function createFolder($data)
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
        return $folder;
    }

    public function updateFolder($data, $id)
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
        return $folder;
    }

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
}

