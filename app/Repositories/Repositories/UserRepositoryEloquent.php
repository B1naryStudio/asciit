<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Entities\User;
use App\Repositories\Contracts\UserRepository;

/**
 * Class UserRepositoryEloquent
 * @package namespace App\RepositoriesRepositories;
 */
class UserRepositoryEloquent extends Repository implements UserRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return User::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}