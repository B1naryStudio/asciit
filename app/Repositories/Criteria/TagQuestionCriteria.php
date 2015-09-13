<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface as Repository;
use Prettus\Repository\Contracts\RepositoryInterface;

class TagQuestionCriteria implements CriteriaInterface
{
    private $question_id;

    public function __construct($question_id)
    {
        $this->question_id = $question_id;
    }

    /**
     * @param $model \Illuminate\Database\Eloquent\Model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply($model, Repository $repository)
    {
        $q_id = $this->question_id;
        return $model->whereHas('questions', function ($q) use ($q_id) {
        $q->where('q_and_a.id', $q_id);
    });
    }
}
