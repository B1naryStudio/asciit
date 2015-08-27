<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Entities\Role;
use App\Repositories\Contracts\RoleRepository;

/**
 * Class RoleRepositoryEloquent
 * @package namespace App\Repositories\Repositories;
 */
class RoleRepositoryEloquent extends Repository implements RoleRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Role::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria( app(RequestCriteria::class) );
    }
}