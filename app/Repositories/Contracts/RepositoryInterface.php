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
     * @return mixed
     */
    public function find($id, $columns = ['*']);

    /**
     * @param $id
     * @param array $relations
     * @return model
     */
    public function findWithRelations($id, array $relations);

    /**
     * @param $fieldName
     * @param $fieldValue
     * @param $relations
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
     * @param $model
     * @param $relationName
     * @param array $modelsToBind
     * @return mixed
     */
    public function relationsAdd($model, $relationName, $modelsToBind);

    public function relationsDestroy($model, $relationName, $modelIds);

    public function pushCriteria(CriteriaInterface $criteria);

    public function firstWhere(array $where , $columns = array('*'));

    /**
     * Return query for request with count and group by
     *
     * @param $relation string Name of relation from repository
     * @param $relation_count string Name of relation from model
     * @param bool|true $use_main_table bool Join table from model or not.
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
     * @param $relation string|array Name of relation from repository or
     *  array with name of relation from repository and name of relation from model
     * @param $limit int Limit
     * @param $use_main_table bool Join table from model or not.
     *  Main table has alias `main`
     * @param array $where array Where clauses
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
     * @param $relation string|array Name of relation from repository or
     *  array with name of relation from repository and name of relation from model
     * @param $limit int Limit
     * @param $use_main_table bool Join table from model or not.
     *  Main table has alias `main`
     * @param array $where array Where clauses
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

    public function setCountedFields($collection);
}