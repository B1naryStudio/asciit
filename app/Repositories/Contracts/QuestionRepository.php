<?php

namespace App\Repositories\Contracts;

use App\Repositories\Entities\Question;

/**
 * Interface QuestionRepository
 * @package namespace App\RepositoriesRepositories;
 */
interface QuestionRepository extends RepositoryInterface
{
    public function relationsAdd(Question $model, $method, array $data);
}
