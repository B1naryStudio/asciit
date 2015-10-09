<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Entities\RoleGlobal;
use App\Repositories\Contracts\RoleGlobalRepository;
use App\Repositories\Criteria\RoleGlobalCriteria;

/**
 * Class RoleGlobalRepositoryEloquent
 * @package namespace App\Repositories\Repositories;
 */
class RoleGlobalRepositoryEloquent extends Repository implements RoleGlobalRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return RoleGlobal::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
        $this->pushCriteria(new RoleGlobalCriteria());
    }
}