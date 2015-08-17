<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface as Repository;
use Prettus\Repository\Contracts\RepositoryInterface;

class CurrentUserCriteria implements CriteriaInterface
{
    /**
     * @var int
     */
    private $user_id;

    public function __construct($user_id)
    {
        $this->user_id = $user_id;
    }

    /**
     * @param $model \Illuminate\Database\Eloquent\Model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply($model, Repository $repository)
    {
        return $model->where('user_id', '=', $this->user_id);
    }
}
