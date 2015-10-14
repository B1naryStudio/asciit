<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Entities\RoleLocal;
use App\Repositories\Contracts\RoleLocalRepository;
use App\Repositories\Criteria\RoleLocalCriteria;

/**
 * Class RoleLocalRepositoryEloquent
 * @package namespace App\Repositories\Repositories;
 */
class RoleLocalRepositoryEloquent extends Repository implements RoleLocalRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return RoleLocal::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
        $this->pushCriteria(new RoleLocalCriteria());
    }
}