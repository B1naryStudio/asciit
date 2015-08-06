<?php
namespace App\QuestionService;
use App\Exceptions\QuestionServiceException;
use App\QuestionService\Contracts\QuestionServiceInterface;
use App\Repositories\Contracts\QuestionRepository;
use App\Repositories\Contracts\AnswerRepository;
use App\Repositories\Contracts\FolderRepository;
use App\Repositories\Contracts\TagRepository;
use App\Exceptions\RepositoryException;
use App\Repositories\Criteria\InCriteria;
use Illuminate\Database\Eloquent\Collection;

class QuestionService implements QuestionServiceInterface
{
    private $questionRepository;
    private $answerRepository;
    private $folderRepository;
    private $tagRepository;

    public function __construct(
        QuestionRepository $questionRepository,
        AnswerRepository $answerRepository,
        FolderRepository $folderRepository,
        TagRepository $tagRepository
    ) {
        $this->questionRepository = $questionRepository;
        $this->answerRepository = $answerRepository;
        $this->folderRepository = $folderRepository;
        $this->tagRepository = $tagRepository;
    }
    
    public function createQuestion($data)
    {
        try {
            $folder = $this->folderRepository->firstOrCreate(['title' => $data['folder']]);
            $data['folder_id'] = $folder->id;
            $this->tagRepository->pushCriteria(new InCriteria('title', $data['tag']));
            $tags = $this->tagRepository->all();
            $tmp = [];
            foreach ($tags as $tag) {
                $tmp[$tag->title] = $tag;
            }
            $tags = [];
            foreach ($data['tag'] as $title) {
                if (empty($tmp[$title])) {
                    $tag = $this->tagRepository->create(['title' => $title]);
                } else {
                    $tag = $tmp[$title];
                }
                $tags[] = $tag;
            }
            $question = $this->questionRepository->create($data);
            $this->questionRepository->relationsAdd($question, 'tags', $tags);
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
                ->findWithRelations($id, ['user', 'folder']);
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
    public function getQuestions()
    {
        $questions =$this->questionRepository->with(['user', 'folder'])->all();
        return $questions;
    }

    /**
     * @param int $question_id
     * @return Collection
     */
    public function getAnswersOfQuestion($question_id)
    {
        return $this->answerRepository
            ->findByFieldWithRelations('question_id', $question_id, ['user']);
    }
    
    public function getEntryComments($question_id){}
    
    public function addComment($data, $entry, $comment_id=null){}
    
    public function addVote($entry_id){}
    
    public function getTag($title){}
    
    public function addTagToQuestion($tag_id, $question_id){}
    
    public function createAnswer($data, $question_id)
    {
        // temporary fix without auth
        $data['user_id'] = 1;

        $new = $this->answerRepository->create($data);

        try {
            $answer = $this->answerRepository
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

    public function getTags()
    {
        try {
            $tags = $this->tagRepository->all();
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $tags;
    }
}

