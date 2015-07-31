<?php
namespace App\QuestionService;
use App\QuestionService\Contructs\QuestionServiceInterface;

class QuestionService implements QuestionServiceInterface{
    
    public function __construct() {}
    
    public function createQuestion($data){}
    
    public function getQuestion($id){}
    
    public function getAnswersOfQuestion($question_id){}
    
    public function getEntryComments($question_id){}
    
    public function addComment($data, $entry, $comment_id=null){}
    
    public function addVote($entry_id){}
    
    public function getTag($title){}
    
    public function addTagToQuestion($tag_id, $question_id){}
    
    public function createAnswer($data, $question_id){}
}

