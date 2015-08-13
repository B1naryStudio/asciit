<?php

namespace App\Services\Questions\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface QuestionServiceInterface
{
    public function createQuestion($data);

    /**
     * @param $id
     * @return Model
     */
    public function getQuestion($id);

    /**
     * @return Collection
     */
    public function getQuestions($pageSize = null, $data = array());

    /**
     * @param $question_id
     * @return Collection
     */
    public function getAnswersOfQuestion($question_id);

    public function getEntryComments($question_id);

    public function addComment($data, $entry, $comment_id = null);

    public function addVote($entry_id);

    public function removeVote($vote_id);

    public function createAnswer($data, $question_id);

    public function getFolders();

    public function getTags($pageSize = null);

    public function getTagsPopular($pageSize = null);

    public function createComment($data, $question_id);
}