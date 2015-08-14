<?php

namespace App\Repositories\Contracts;

/**
 * Interface TagRepository
 * @package namespace App\RepositoriesRepositories;
 */
interface TagRepository extends RepositoryInterface
{
    public function createSeveral(array $attributes);
}
