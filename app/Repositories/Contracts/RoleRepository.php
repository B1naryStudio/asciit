<?php

namespace App\Repositories\Contracts;

/**
 * Interface TagRepository
 * @package namespace App\RepositoriesRepositories;
 */
interface RoleRepository extends RepositoryInterface
{
    /**
     * @param $title
     * @return array
     */
    public function getByTitle($title);
}
