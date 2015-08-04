<?php
namespace App\QuestionService;
use App\Exceptions\QuestionServiceException;
use App\QuestionService\Contracts\QuestionServiceInterface;
use App\Repositories\Repositories\QuestionRepository;
use App\Exceptions\RepositoryException;

class QuestionService implements QuestionServiceInterface {

    private $questionRepository;

    public function __construct(
        QuestionRepository $questionRepository
    ) {
        $this->questionRepository = $questionRepository;
    }
    
    public function createQuestion($data)
    {
        try {
            $question = $this->questionRepository->create($data);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage(),
                null,
                $e
            );
        }
        return $question;
    }
    
    public function getQuestion($id)
    {
        try {
            $question = $this->questionRepository
                ->findWithRelations($id, ['user', 'folder']);
        } catch (RepositoryException $e) {
            throw new QuestionServiceException(
                $e->getMessage() . " No such question",
                null,
                $e
            );
        }

        return $question;
    }
    
    public function getAnswersOfQuestion($question_id){}
    
    public function getEntryComments($question_id){}
    
    public function addComment($data, $entry, $comment_id=null){}
    
    public function addVote($entry_id){}
    
    public function getTag($title){}
    
    public function addTagToQuestion($tag_id, $question_id){}
    
    public function createAnswer($data, $question_id){}
}

