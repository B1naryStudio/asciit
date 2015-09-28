<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Criteria\AnswerCriteria;
use App\Repositories\Entities\Answer;
use App\Repositories\Contracts\AnswerRepository;

class AnswerRepositoryEloquent extends Repository implements AnswerRepository
{
    protected $relations = [
        'votes' => [
            'table' => 'votes',
            'foreignKey' =>  'q_and_a_id',
            'otherKey' => 'q_and_a_id',
            'count' => 'vote_value',
            'fields' => [
                'sum(if(sign>0, 1, -1))' => 'vote_value',
                'sum(if(sign>0, 1, 0))' => 'vote_likes',
                'sum(if(sign>0, 0, 1))' => 'vote_dislikes'
            ]
        ]
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Answer::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
        $this->pushCriteria(new AnswerCriteria());
    }

    public function setClosed($model, $value)
    {
        $model->closed = $value;
        $model->save();

        return $model;
    }

    public function setClosedById($id, $value)
    {
        $model = $this->find($id);
        return $this->setClosed($model, $value);
    }
}