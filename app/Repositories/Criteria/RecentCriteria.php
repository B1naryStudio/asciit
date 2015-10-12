<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\CriteriaInterface;

class RecentCriteria implements CriteriaInterface
{
    private $orderBy;

    private $sortedBy;

    public function __construct($orderBy, $sortedBy)
    {
        $this->orderBy = $orderBy;
        $this->sortedBy = $sortedBy;
    }

    public function apply($model, RepositoryInterface $repository)
    {
        return $model->orderBy($this->orderBy, $this->sortedBy);
    }
}
