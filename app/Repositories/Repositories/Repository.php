<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Repositories\Exceptions\RepositoryException;
use App\Repositories\Contracts\RepositoryInterface;
use Illuminate\Database\QueryException;

abstract class Repository extends BaseRepository implements RepositoryInterface
{

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

    public function firstWhere(array $where , $columns = array('*'))
    {
        $results = parent::findWhere($where, $columns);

        if ($results) {
            return $results->first();
        }

        return [];
    }

    public function create(array $attributes)
    {
        try {
            return parent::create($attributes);
        } catch (QueryException $e) {
            throw new RepositoryException('Cannot save the entity!', null, $e);
        }
    }

    public function delete($id)
    {
        $model = $this->find($id);

        if (parent::delete($id)) {
            return $model;
        } else {
            throw new RepositoryException('Cannot delete the model!');
        }
    }

    /**
     * @param $id
     * @param array $relations
     * @return model
     */
    public function findWithRelations($id, array $relations)
    {
        return $this->with($relations)->find($id);
    }

    /**
     * @param $fieldName
     * @param $fieldValue
     * @param $relations
     * @param array $columns
     * @return collection
     */
    public function findByFieldWithRelations($fieldName, $fieldValue, $relations, $columns=['*'])
    {
        return $this->with($relations)->findByField($fieldName, $fieldValue);
    }

    public function firstOrCreate(array $attributes)
    {
        if (!is_null($instance = $this->findWhere($attributes)->first())) {
            return $instance;
        }

        return static::create($attributes);
    }

    public function relationsAdd($model, $method, array $data)
    {
        $model->$method()->saveMany($data);
    }
}