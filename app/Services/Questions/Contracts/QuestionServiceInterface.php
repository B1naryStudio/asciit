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
    public function getQuestionById($id);

    /**
     * @param $id
     * @return Model
     */
    public function getQuestionBySlug($id);

    /**
     * @return Collection
     */
    public function getQuestions($pageSize = null, $data = array());

    /**
     * @param $question_id
     * @return Collection
     */
    public function getAnswersOfQuestion($question_id);

    public function addVote($entry_id);

    public function removeVote($vote_id);

    public function createAnswer($data, $question_id);

    public function getFolders();

    public function getTags($pageSize = null);

    public function getTagsPopular($pageSize = null, $search = '');

    public function createComment($data, $question_id);

    public function getQuestionsPopular($pageSize = null, $data = array());

    public function getQuestionsUpvoted($pageSize = null, $data = array());

    public function getQuestionsTopCommented($pageSize = null, $data = array());

    public function getQuestionsByUser($pageSize = null);

    public function removeFolder($id);

    public function createFolder($data);

    public function updateFolder($data, $id);

    public function getFoldersForCrud($pageSize = null);
}
