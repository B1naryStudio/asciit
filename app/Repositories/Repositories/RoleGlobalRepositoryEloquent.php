<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Entities\RoleGlobal;
use App\Repositories\Contracts\RoleGlobalRepository;
use App\Repositories\Criteria\RoleGlobalCriteria;
use App\Repositories\Contracts\RoleLocalRepository;
use Illuminate\Container\Container as Application;

/**
 * Class RoleGlobalRepositoryEloquent
 * @package namespace App\Repositories\Repositories;
 */
class RoleGlobalRepositoryEloquent extends Repository implements RoleGlobalRepository
{
    private $localRoleRepository;

    public function __construct(
        Application $app,
        RoleLocalRepository $localRepository
    ) {
        $this->localRoleRepository = $localRepository;

        parent::__construct($app);
    }

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

    public function create(array $attributes)
    {
        if (empty($attributes['local_id'])) {
            $role = $this->localRoleRepository->findWhere(['title' => 'ADMIN']);
            if (!empty($role)) {
                $attributes['local_id'] = $role->first()->id;
            }
        }

        return parent::create($attributes);
    }
}