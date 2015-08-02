<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Entities\Folder;

/**
 * Class FolderRepositoryEloquent
 * @package namespace App\RepositoriesRepositories;
 */
class FolderRepositoryEloquent extends Repository implements FolderRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Folder::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria( app(RequestCriteria::class) );
    }
}