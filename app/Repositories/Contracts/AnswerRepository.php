<?php

namespace App\Repositories\Contracts;

/**
 * Interface FolderRepository
 * @package namespace App\RepositoriesRepositories;
 */
interface AnswerRepository extends RepositoryInterface
{
    public function setClosed($model, $value);
    public function setClosedById($id, $value);
}
