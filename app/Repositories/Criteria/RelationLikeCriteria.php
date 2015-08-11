<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface as Repository;
use Prettus\Repository\Contracts\RepositoryInterface;

class RelationLikeCriteria implements CriteriaInterface
{
    /**
     * @var string
     */
    private $field;

    /**
     * @var strings
     */
    private $value;

    /*
     * @var string
     */
    private $method;

    public function __construct($method, $field, $value)
    {
        $this->method = $method;
        $this->value = $value;
        $this->field = $field;
    }

    /**
     * @param $model \Illuminate\Database\Eloquent\Model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply($model, Repository $repository)
    {
        return $model->whereHas($this->method, function ($query) {
            $query->where($this->field, 'like', $this->value);
        });
    }
}
