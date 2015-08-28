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

    /**
     * @param $title
     * @return array
     */
    public function getByTitle($title)
    {
        if ($title == 'ADMIN') {
            $role = $this->firstWhere(['title' => 'ADMIN']);
        } else {
            $role = $this->firstWhere(['title' => 'USER']);
        }

        return $role;
    }
}