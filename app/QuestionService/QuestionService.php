<?php
namespace App\QuestionService;
use App\Exceptions\QuestionServiceException;
use App\QuestionService\Contracts\QuestionServiceInterface;
use App\Repositories\Contracts\QuestionRepository;
use App\Repositories\Contracts\AnswerRepository;
use App\Exceptions\RepositoryException;
use Response;

class QuestionService implements QuestionServiceInterface
{

    private $questionRepository;
    private $answerRepository;

    public function __construct(
        QuestionRepository $questionRepository,
        AnswerRepository $answerRepository
    ) {
        $this->questionRepository = $questionRepository;
        $this->answerRepository = $answerRepository;
    }
    
    public function createQuestion($data){}

    /**
     * @param $id
     * @return model
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
     * @param $question_id
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
    
    public function createAnswer($data, $question_id){}
}

