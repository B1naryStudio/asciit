<?php

namespace App\Services\Questions\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Repositories\Entities\Question;
use App\Repositories\Entities\Vote;
use App\Repositories\Entities\Answer;
use App\Repositories\Entities\Comment;
use App\Repositories\Entities\Folder;

interface QuestionServiceInterface
{
    /**
     * @param array $data
     * @return Question
     */
    public function createQuestion(array $data);

    /**
     * @param int $id
     * @return Question
     */
    public function getQuestionById($id);

    /**
     * @param string $id
     * @return Question
     */
    public function getQuestionBySlug($slug);

    /**
     * @return Collection
     */
    public function getQuestions($pageSize = null, $data = array());

    /**
     * @param $question_id
     * @return Collection
     */
    public function getAnswersOfQuestion($question_id);

    /**
     * @param array $data
     * @return Vote
     */
    public function addVote(array $data);

    /**
     * @param int $vote_id
     * @return Vote
     */
    public function removeVote($vote_id);

    /**
     * @param array $data
     * @param int $question_id
     * @return Answer
     */
    public function createAnswer(array $data, $question_id);

    /**
     * @return mixed
     */
    public function getFolders();

    /**
     * @param int|null $pageSize
     * @return LengthAwarePaginator
     */
    public function getTags($pageSize = null);

    /**
     * @param int|null $pageSize
     * @param string $search
     * @return LengthAwarePaginator
     */
    public function getTagsPopular($pageSize = null, $search = '');

    /**
     * @param array $data
     * @param int $question_id
     * @return Comment
     */
    public function createComment(array $data, $question_id);

    /**
     * @param int|null $pageSize
     * @param array $data
     * @return LengthAwarePaginator
     */
    public function getQuestionsPopular($pageSize = null, $data = array());

    /**
     * @param int|null $pageSize
     * @param array $data
     * @return LengthAwarePaginator
     */
    public function getQuestionsUpvoted($pageSize = null, $data = array());

    /**
     * @param int|null $pageSize
     * @param array $data
     * @return LengthAwarePaginator
     */
    public function getQuestionsTopCommented($pageSize = null, $data = array());

    /**
     * @param int|null $pageSize
     * @return LengthAwarePaginator
     */
    public function getQuestionsByUser($pageSize = null);

    /**
     * @param int $id
     * @return Folder
     */
    public function removeFolder($id);

    /**
     * @param array $data
     * @return Folder
     */
    public function createFolder(array $data);

    /**
     * @param array $data
     * @param int $id
     * @return Folder
     */
    public function updateFolder(array $data, $id);

    /**
     * @param null $pageSize
     * @return LengthAwarePaginator
     */
    public function getFoldersForCrud($pageSize = null);

    /**
     * @param array $data
     * @param int $id
     * @return Comment
     */
    public function updateComment(array $data, $id);

    /**
     * @param int $id
     * @return Comment
     */
    public function removeComment($id);

    /**
     * @param null|int $pageSize
     * @return LengthAwarePaginator
     */
    public function getAnswersByUser($pageSize = null);

    /**
     * @param array $data
     * @param int $answer_id
     * @return Answer
     */
    public function updateAnswer(array $data, $answer_id);

    /**
     * @param int $question_id
     * @param int $answer_id
     * @param bool $closing_value
     * @return bool
     */
    public function handleQuestionClosing(
        $question_id,
        $answer_id,
        $closing_value
    );

    /**
     * @param int $id
     * @return Answer
     */
    public function removeAnswer($id);

    /**
     * @param array $data
     * @param int $id
     * @return Question
     */
    public function updateQuestion(array $data, $id);

    /**
     * @param int $id
     * @return Question
     */
    public function removeQuestion($id);

    /**
     * @param Question $question
     * @param array $tagTitlesTargetList
     */
    public function updateQuestionTags(
        Question $question,
        array $tagTitlesTargetList
    );

    /**
     * @param int $pageSize
     * @param array $data
     * @return mixed
     */
    public function getQuestionsRecent($pageSize, $data = array());
}
