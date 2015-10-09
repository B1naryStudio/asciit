<?php
/**
 * Created by PhpStorm.
 * User: antarus66
 * Date: 8/4/15
 * Time: 11:29 AM
 */
namespace App\Repositories\Contracts;

use Prettus\Repository\Contracts\RepositoryInterface as BaseRepositoryInterface;

use Prettus\Repository\Contracts\CriteriaInterface;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface RepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Find data by id
     *
     * @param $id
     * @param array $columns
     * @return Model
     */
    public function find($id, $columns = ['*']);

    /**
     * @param $id
     * @param array $relations
     * @return Model
     */
    public function findWithRelations($id, array $relations);

    /**
     * @param string $fieldName
     * @param string $fieldValue
     * @param array $relations
     * @param array $columns
     * @return collection
     */
    public function findByFieldWithRelations(
        $fieldName,
        $fieldValue,
        $relations,
        $columns = ['*']
    );

    /**
     * @param array $keyAttributes
     * @return model
     */
    public function firstOrCreate(array $keyAttributes);

    /**
     * @param Model $model
     * @param string $relationName
     * @param array $modelsToBind
     * @return mixed
     */
    public function relationsAdd(Model $model, $relationName, $modelsToBind);

    /**
     * @param Model $model
     * @param $relationName
     * @param $modelIds
     * @return mixed
     */
    public function relationsDestroy(Model $model, $relationName, $modelIds);

    /**
     * @param CriteriaInterface $criteria
     * @return mixed
     */
    public function pushCriteria(CriteriaInterface $criteria);

    /**
     * @param array $where
     * @param array $columns
     * @return Model
     */
    public function firstWhere(array $where , $columns = array('*'));

    /**
     * Return query for request with count and group by
     *
     * @param string $relation Name of relation from repository
     * @param string $relation_count Name of relation from model
     * @param bool|true $use_main_table Join table from model or not.
     *  Main table has alias `main`
     * @return Builder
     */
    public function getRelationRecordCount(
        $relation,
        $relation_count,
        $use_main_table = true
    );

    /**
     * Return models with count records from related table
     *
     * @param string|array $relation Name of relation from repository or
     *  array with name of relation from repository and name of relation from model
     * @param int $limit Limit
     * @param bool $use_main_table Join table from model or not.
     *  Main table has alias `main`
     * @param array $where Where clauses
     * @return array
     */
    public function loadRelationPopular(
        $relation,
        $limit,
        $use_main_table,
        $relations = array(),
        $where = array()
    );

    /**
     * Return models with count records from related table for pagination
     *
     * @param string|array $relation Name of relation from repository or
     *  array with name of relation from repository and name of relation from model
     * @param int $limit Limit
     * @param bool $use_main_table Join table from model or not.
     *  Main table has alias `main`
     * @param array $where Where clauses
     * @return LengthAwarePaginator
     */
    public function loadRelationPopularPaginate(
        $relation,
        $limit,
        $use_main_table,
        $relations = array(),
        $where = array()
    );

    /**
     * @return RepositoryInterface
     */
    public function withRelationCount();

    /**
     * @return RepositoryInterface
     */
    public function withoutRelationCount();

    /**
     * @param $collection
     * @return mixed
     */
    public function setCountedFields(Collection $collection);
}