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
    public function findByFieldWithRelations($fieldName, $fieldValue, $relations, $columns = ['*']);

    /**
     * @param array $attributes
     * @return model
     */
    public function firstOrCreate(array $attributes);

    /**
     * @param $model
     * @param $method
     * @param array $data
     * @return mixed
     */
    public function relationsAdd($model, $method, array $data);

    public function pushCriteria(CriteriaInterface $criteria);
}