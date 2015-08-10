<?php

namespace App\Repositories\Contracts;

use Prettus\Repository\Contracts\CriteriaInterface;

/**
 * Interface TagRepository
 * @package namespace App\RepositoriesRepositories;
 */
interface TagRepository extends RepositoryInterface
{
    public function pushCriteria(CriteriaInterface $criteria);

    public function createSeveral(array $attributes);
}
