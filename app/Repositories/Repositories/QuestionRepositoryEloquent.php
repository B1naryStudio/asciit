<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Entities\Question;
use App\Repositories\Contracts\QuestionRepository;
/**
 * Class QuestionRepositoryEloquent
 * @package namespace App\RepositoriesRepositories;
 */
class QuestionRepositoryEloquent extends Repository implements QuestionRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Question::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}