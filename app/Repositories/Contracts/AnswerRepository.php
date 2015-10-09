<?php

namespace App\Repositories\Contracts;

use App\Repositories\Entities\Answer;

/**
 * Interface FolderRepository
 * @package namespace App\RepositoriesRepositories;
 */
interface AnswerRepository extends RepositoryInterface
{
    /**
     * @param Answer $model
     * @param bool $value
     * @return Answer
     */
    public function setClosed($model, $value);

    /**
     * @param int $id
     * @param bool $value
     * @return Answer
     */
    public function setClosedById($id, $value);
}
