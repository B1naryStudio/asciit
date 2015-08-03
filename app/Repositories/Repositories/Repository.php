<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Exceptions\RepositoryException;

abstract class Repository extends BaseRepository {

    /**
     * Find data by id
     *
     * @param $id
     * @param array $columns
     * @return mixed
     */
    public function find($id, $columns = ['*'])
    {
        try {
            return parent::find($id, $columns);
        } catch (ModelNotFoundException $e) {
            throw new RepositoryException('Entity is not found!', null, $e);
        }
    }

    public function findWithRelations($id, array $relations)
    {
        return $this->with($relations)->find($id);
    }
}