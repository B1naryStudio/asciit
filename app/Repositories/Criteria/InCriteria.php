<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface as Repository;
use Prettus\Repository\Contracts\RepositoryInterface;

class InCriteria implements CriteriaInterface
{
    /**
     * @var string
     */
    private $field;

    /**
     * @var array
     */
    private $values;

    public function __construct($field, array $values)
    {
        $this->values = $values;
        $this->field = $field;
    }

    /**
     * @param $model Model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply($model, Repository $repository)
    {
        return $model->whereIn($this->field, $this->values);
    }
}
