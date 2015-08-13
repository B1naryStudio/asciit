<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Criteria\QuestionCriteria;
use App\Repositories\Entities\Question;
use App\Repositories\Contracts\QuestionRepository;

/**
 * Class QuestionRepositoryEloquent
 * @package namespace App\RepositoriesRepositories;
 */
class QuestionRepositoryEloquent extends Repository implements QuestionRepository
{
    protected $with_relation_count = true;

    protected $fieldSearchable = [
        'title' => 'like',
        'description' => 'like',
    ];

    protected $relations = [
        'answers' => [
            'table' => 'q_and_a',
            'foreignKey' =>  'question_id',
            'otherKey' => 'question_id',
            'count' => 'answers_count'
        ]
    ];

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
        $this->pushCriteria(new QuestionCriteria());
    }
}