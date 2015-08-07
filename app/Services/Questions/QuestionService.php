<?php
namespace App\Services\Questions;
use App\Exceptions\QuestionServiceException;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use App\Repositories\Contracts\QuestionRepository;
use App\Repositories\Contracts\AnswerRepository;
use App\Repositories\Contracts\FolderRepository;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class QuestionService implements QuestionServiceInterface
{
    private $questionRepository;
    private $answerRepository;
    private $folderRepository;

    public function __construct(
        QuestionRepository $questionRepository,
        AnswerRepository $answerRepository,
        FolderRepository $folderRepository
    ) {
        $this->questionRepository = $questionRepository;
        $this->answerRepository = $answerRepository;
        $this->folderRepository = $folderRepository;
    }
    
    public function createQuestion($data)
    {
        try {
            $folder = $this->folderRepository->firstOrCreate(['title' => $data['folder']]);
            $data['folder_id'] = $folder->id;
            $question = $this->questionRepository->create($data);
            $question->save();
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
    public function getQuestions($pageSize = null)
    {
        $questions = $this->questionRepository
            ->with(['user', 'folder'])
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
}

