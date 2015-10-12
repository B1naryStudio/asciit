<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\CriteriaInterface;

class LimitCriteria implements CriteriaInterface
{
    private $limit;

    public function __construct($limit)
    {
        $this->limit = $limit;
    }

    public function apply($model, RepositoryInterface $repository)
    {
        return $model->limit($this->limit);
    }
}
