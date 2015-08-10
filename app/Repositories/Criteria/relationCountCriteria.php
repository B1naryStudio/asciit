<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface as Repository;
use Prettus\Repository\Contracts\RepositoryInterface;

class relationCountCriteria implements CriteriaInterface
{
    /**
     * @var string
     */
    private $base_field;

    /**
     * @var strings
     */
    private $relation_field;

    /*
     * @var string
     */
    private $method;

    public function __construct($method, $base_field, $relation_field)
    {
        $this->method = $method;
        $this->base_field = $base_field;
        $this->relation_field = $relation_field;
    }

    /**
     * @param $model \Illuminate\Database\Eloquent\Model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply($model, Repository $repository)
    {
        $method = $this->method;
        return $model->$method()->groupBy($this->base_field);
    }
}
