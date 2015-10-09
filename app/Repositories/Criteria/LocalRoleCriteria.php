<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\CriteriaInterface;

class LocalRoleCriteria implements CriteriaInterface
{
    public function apply($model, RepositoryInterface $repository)
    {
        $model = $model->whereNull('is_global');
        return $model;
    }
}
