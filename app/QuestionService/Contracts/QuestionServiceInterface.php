<?php

namespace App\QuestionService\Contracts;

interface QuestionServiceInterface 
{
    public function createQuestion($data);

    /**
     * @param $id
     * @return model
     */
    public function getQuestion($id);

    /**
     * @param $question_id
     * @return Collection
     */
    public function getAnswersOfQuestion($question_id);

    public function getEntryComments($question_id);

    public function addComment($data, $entry, $comment_id = null);

    public function addVote($entry_id);

    public function getTag($title);

    public function addTagToQuestion($tag_id, $question_id);

    public function createAnswer($data, $question_id);
}