<?php

namespace App\Repositories\Contracts;

use App\Repositories\Entities\Question;

/**
 * Interface QuestionRepository
 * @package namespace App\RepositoriesRepositories;
 */
interface QuestionRepository extends RepositoryInterface
{
    public function setClosed($model, $value);
    public function setClosedById($id, $value);
}
