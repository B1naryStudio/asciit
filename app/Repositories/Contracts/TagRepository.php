<?php

namespace App\Repositories\Contracts;

/**
 * Interface TagRepository
 * @package namespace App\RepositoriesRepositories;
 */
interface TagRepository extends RepositoryInterface
{
    public function getRelationCount($relation, $table, $count, $order = array());
}
