<?php

namespace App\Repositories\Contracts;

use App\Repositories\Entities\Question;

/**
 * Interface QuestionRepository
 * @package namespace App\RepositoriesRepositories;
 */
interface QuestionRepository extends RepositoryInterface
{
    /**
     * @param Question $model
     * @param bool $value
     * @return Question
     */
    public function setClosed($model, $value);

    /**
     * @param int $id
     * @param bool $value
     * @return Question
     */
    public function setClosedById($id, $value);
}
