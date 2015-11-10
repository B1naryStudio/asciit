<?php

namespace App\Repositories\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Prettus\Repository\Eloquent\BaseRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Repositories\Exceptions\RepositoryException;
use App\Repositories\Contracts\RepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Repository
 * @package App\Repositories\Repositories
 */
abstract class Repository extends BaseRepository implements RepositoryInterface
{
    protected $relations = [];

    protected $with_relation_count = false;

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
            $result = parent::find($id, $columns);
            if ($this->with_relation_count) {
                foreach ($this->relations as $relation => $options) {
                    $tmp = $this
                        ->getRelationRecordCount($relation, $relation)
                        ->whereIn('main.id', [$id])->get()->all();

                    $tmp2 = [];
                    foreach ($options['fields'] as $field) {
                        foreach ($tmp as $record) {
                            $tmp2[$record->id] = $record->$field;
                        }
                        $result->$field = !empty($tmp2[$id]) ? $tmp2[$id] : 0;
                    }
                }
            }
            return $result;
        } catch (ModelNotFoundException $e) {
            throw new RepositoryException('Entity is not found!', null, $e);
        }
    }

    public function findByField($field, $value = null, $columns = array('*'))
    {
        try {
            $collection = parent::findByField($field, $value, $columns);
            if ($collection->count() === 0) {
                throw new ModelNotFoundException();
            }
            if ($this->with_relation_count) {
                $collection = $this->setCountedFields($collection);
            }
            return $collection;
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
     * @param string $fieldName
     * @param mixed $fieldValue
     * @param array $relations
     * @param array $columns
     * @return collection
     */
    public function findByFieldWithRelations(
        $fieldName,
        $fieldValue,
        $relations,
        $columns=['*']
    ) {
        return $this->with($relations)->findByField($fieldName, $fieldValue);
    }

    public function firstOrCreate(array $attributes)
    {
        if (!is_null($instance = $this->findWhere($attributes)->first())) {
            return $instance;
        }

        return static::create($attributes);
    }

    public function updateFirstOrCreate(array $keyAttributes, array $attributes=[])
    {
        $attrs = array_merge($keyAttributes, $attributes);
        $collection = $this->findWhere($keyAttributes);

        if (!$collection->isEmpty()) {
            $instance = $collection->first();
            return $this->update($attrs, $instance->id);
        }

        return $this->create($attrs);
    }

    public function relationsAdd(Model $model, $relationName, $modelsToBind)
    {
        $model->$relationName()->saveMany($modelsToBind);
    }

    public function relationsDestroy(Model $model, $relationName, $modelIds)
    {
        if (!is_array($modelIds)) {
            $modelIds = [$modelIds];
        }

        $model->$relationName()->detach($modelIds);
    }

    public function getRelationRecordCount(
        $relation,
        $relation_count,
        $use_main_table = true
    ) {
        $this->with($relation); // substitutes the model with a Builder instance
        $model = $this->model;
        $query = Relation::noConstraints(function () use (
            $model,
            $relation,
            $relation_count
        ) {
            return $model->getRelation($relation_count)->groupBy(
                    $this->relations[$relation]['table'] . '.' .
                    $this->relations[$relation]['foreignKey']
                )->orderBy($this->relations[$relation]['count'], 'desc');
        });

        if ($model instanceof Builder) {
            $model = $model->getModel();
        }

        $table = $query->getQuery()->getModel()->getTable();
        $query->setModel($this->model->getModel());
        $query->getQuery()->getQuery()->from($table);

        if ($use_main_table) {
            $query->select(['main.*']);
        }

        foreach ($this->relations[$relation]['fields'] as $field => $name) {
            $query->selectRaw($field . ' as ' . $name);
        }

        if ($use_main_table) {
            $query->join(
                $model->getTable() . ' as main',
                'main.id',
                '=',
                $this->relations[$relation]['table'] . '.' .
                $this->relations[$relation]['foreignKey']
            );
        }

        // It is necessary to return the previous state of the model after
        // using "$this->with()", which substitutes the model with a Builder
        // instance.
        $this->resetModel();
        return $query;
    }

    public function loadRelationPopular(
        $relation,
        $count,
        $use_main_table = true,
        $relations = array(),
        $where = array()
    )
    {
        if (!is_array($relation)) {
            $relation_count = $relation;
        } else {
            $relation_count = $relation[1];
            $relation = $relation[0];
        }

        $query = $this->getRelationRecordCount(
            $relation,
            $relation_count,
            $use_main_table
        );
        if (!empty($where)) {
            foreach ($where as $condition) {
                if (is_array($condition) && count($condition) === 2 ) {
                    $query->whereRaw($condition[0], $condition[1]);
                } elseif (is_array($condition) && count($condition) === 3 ) {
                    $query->where($condition[0], $condition[1], $condition[2]);
                } else {
                    $query->whereRaw($condition);
                }
            }
        }

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query
            ->orderBy($this->relations[$relation]['count'], 'desc')
            ->limit($count)
            ->get()
            ->all();
    }

    public function loadRelationPopularPaginate(
        $relation,
        $limit,
        $use_main_table = true,
        $relations = array(),
        $where = array()
    ) {
        if (!is_array($relation)) {
            $relation_count = $relation;
        } else {
            $relation_count = $relation[1];
            $relation = $relation[0];
        }

        $query = $this->getRelationRecordCount($relation, $relation_count, $use_main_table);
        if (!empty($where)) {
            foreach ($where as $condition) {
                if (is_array($condition) && count($condition) === 2 ) {
                    $query->whereRaw($condition[0], $condition[1]);
                } elseif (is_array($condition) && count($condition) === 3 ) {
                    $query->where($condition[0], $condition[1], $condition[2]);
                } else {
                    $query->whereRaw($condition);
                }
            }
        }

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query
            ->orderBy($this->relations[$relation]['count'], 'desc')
            ->paginate($limit);
    }

    public function withRelationCount()
    {
        $this->with_relation_count = true;
        return $this;
    }

    public function withoutRelationCount()
    {
        $this->with_relation_count = false;
        return $this;
    }

    public function all($columns = array('*'))
    {
        $collection = parent::all($columns);

        if ($this->with_relation_count) {
            $collection = $this->setCountedFields($collection);
        }

        return $collection;
    }

    public function paginate($limit = null, $columns = array('*'))
    {
        $paginator = parent::paginate($limit, $columns);

        if ($this->with_relation_count) {
            $id = [];
            foreach ($paginator->items() as $item) {
                $id[] = $item->id;
            }

            foreach ($this->relations as $relation => $options) {
                $tmp = $this
                    ->getRelationRecordCount($relation, $relation)
                    ->whereIn('main.id', $id)->get()->all();

                $tmp2 = [];

                foreach ($options['fields'] as $field) {
                    foreach ($tmp as $record) {
                        $tmp2[$record->id] = $record->$field;
                    }

                    foreach ($paginator->items() as &$item) {
                        $item[$field] = !empty($tmp2[$item->id]) ? $tmp2[$item->id] : 0;
                    }
                }
                unset($item);
            }
        }

        return $paginator;
    }

    /**
     * @param Collection $collection
     * @return Collection
     */
    public function setCountedFields(Collection $collection)
    {
        $id = [];
        $collection->each(function ($item, $key) use (&$id) {
            $id[] = $item->id;
        });

        foreach ($this->relations as $relation => $options) {
            $tmp = $this
                ->getRelationRecordCount($relation, $relation)
                ->whereIn('main.id', $id)->get()->all();

            $tmp2 = [];
            foreach ($options['fields'] as $field) {
                foreach ($tmp as $record) {
                    $tmp2[$record->id] = $record->$field;
                }
                $collection = $collection->each(function ($item, $key) use ($field, $tmp2) {
                    $item[$field] = !empty($tmp2[$item->id]) ? $tmp2[$item->id] : 0;
                });
            }
        }

        return $collection;
    }

    public function setProtectedProperty(Model $model, $prop, $value)
    {
        $model->$prop = $value;
        $model->save();

        return $model;
    }

    public function setProtectedPropertyById($id, $prop, $value)
    {
        $model = $this->find($id);
        return $this->setProtectedProperty($model, $prop, $value);
    }
}