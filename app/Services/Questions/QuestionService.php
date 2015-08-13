<?php
namespace App\Services\Questions;;
use App\Repositories\Criteria\relationCountCriteria;
use App\Repositories\Criteria\RelationLikeCriteria;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use App\Repositories\Contracts\QuestionRepository;
use App\Repositories\Contracts\AnswerRepository;
use App\Repositories\Contracts\FolderRepository;
use App\Repositories\Exceptions\RepositoryException;
use App\Repositories\Contracts\TagRepository;
use App\Repositories\Contracts\VoteRepository;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Criteria\InCriteria;
use App\Services\Questions\Exceptions\QuestionServiceException;
use Illuminate\Support\Facades\Auth;
use App\Repositories\Contracts\CommentRepository;

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
            $folder = $this->folderRepository->firstOrCreate(['title' => $data['folder']]);
            $data['folder_id'] = $folder->id;
            $question = $this->questionRepository->create($data);

            if (!empty($data['tag'])) {
                $this->tagRepository->pushCriteria(new InCriteria('title', $data['tag']));
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
                    $tags = array_merge($tags, $this->tagRepository->createSeveral($not_exist));
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
                ->findWithRelations($id, ['user', 'folder', 'tags', 'comment.user']);
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
            $this->questionRepository->pushCriteria(new RelationLikeCriteria('tags', 'title', $data['tag']));
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
        return $this->answerRepository
            ->withRelationCount()
            ->findByFieldWithRelations('question_id', $question_id, ['user', 'comment.user']);
    }
    
    public function getEntryComments($question_id){}
    
    public function addComment($data, $entry, $comment_id=null){}

    public function addVote($data)
    {
        $data['user_id'] = Auth::user()->id;

        $same = $this->voteRepository->firstWhere([
            'user_id'    => $data['user_id'],
            'q_and_a_id' => $data['q_and_a_id'],
        ]);

        // If this like is unique
        if (!$same) {
            return $this->voteRepository->create($data);
        } else {
            throw new QuestionServiceException('User can\'t vote twice!');
        }
    }

    public function removeVote($vote_id)
    {
        try {
            return $this->voteRepository->delete($vote_id);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage() . ' Can\'t unlike it.',
                null,
                $e
            );
        }
    }
    
    public function createAnswer($data, $question_id)
    {
        $data['user_id'] = Auth::user()->id;

        $new = $this->answerRepository->create($data);

        try {
            $answer = $this->answerRepository->withRelationCount()
                ->findWithRelations($new->id, ['user']);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage() . ' No such answer',
                null,
                $e
            );
        }

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

    public function getTagsPopular($pageSize = null)
    {
        try {
            $tags = $this->tagRepository->loadRelationPopular('questions', $pageSize);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $tags;
    }

    public function createComment($data, $question_id)
    {
        // temporary fix without auth
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

        return $comment;
    }

    public function getQuestionsPopular($pageSize = null)
    {
        try {
            $questions = $this->questionRepository->loadRelationPopular('answers', $pageSize, [
                ['q_and_a.question_id is not null']
            ]);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $questions;
    }

    public function getQuestionsUpvoted($pageSize = null)
    {
        try {
            $questions = $this->questionRepository->loadRelationPopular('votes', $pageSize, [
                ['main.question_id is null']
            ]);
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

