<?php

namespace App\Repositories\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Repositories\Exceptions\RepositoryException;
use App\Repositories\Contracts\RepositoryInterface;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\Expression;

abstract class Repository extends BaseRepository implements RepositoryInterface
{
    protected $relations;

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

    public function getRelationRecordCount($relation)
    {
        $this->with($relation);
        $model = $this->model;
        $query = Relation::noConstraints(function () use ($model, $relation) {
            return $model->getRelation($relation)
                ->groupBy(
                    $this->relations[$relation]['table'] . '.' .
                    $this->relations[$relation]['foreignKey']
                )
                ->orderBy($this->relations[$relation]['count'], 'desc');
        });

        if ($model instanceof Builder) {
            $model = $model->getModel();
        }

        $query->select(['main.*'])
            ->selectRaw('count(*) as ' . $this->relations[$relation]['count'])
            ->join(
                $model->getTable() . ' as main',
                'main.id',
                '=',
                $this->relations[$relation]['table'] . '.' .
                    $this->relations[$relation]['foreignKey']
            );

        return $query;
    }

    public function loadRelationPopular($relation, $count, $where = array())
    {
        $query = $this->getRelationRecordCount($relation);
        if (!empty($where)) {
            foreach ($where as $condition) {
                if (count($condition) === 2 ) {
                    $query->whereRaw($condition[0], $condition[1]);
                } else {
                    $query->whereRaw($condition[0]);
                }
            }
        }

        return $query
            ->orderBy($this->relations[$relation]['count'], 'desc')
            ->limit($count)
            ->get()
            ->all();
    }
}