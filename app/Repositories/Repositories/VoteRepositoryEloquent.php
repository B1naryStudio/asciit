<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Entities\Vote;
use App\Repositories\Contracts\VoteRepository;

/**
 * Class VoteRepositoryEloquent
 * @package namespace App\Repositories\Repositories;
 */
class VoteRepositoryEloquent extends Repository implements VoteRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Vote::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria( app(RequestCriteria::class) );
    }
}