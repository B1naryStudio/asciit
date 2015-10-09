<?php

namespace App\Services\Auth\Contracts;

use App\Repositories\Entities\User;

interface AuthServiceInterface
{
    public function authenticate(array $data);

    public function logout();

    public function getUser();

    /**
     * @param string $cookie
     * @return mixed
     */
    public function getUserFromCookie($cookie);

    /**
     * @param array $data
     * @param int $id
     * @return mixed
     */
    public function updateUser(array $data, $id);

    /**
     * @param int $newRoleId
     * @param User $user
     * @return User
     */
    public function updateUserRole($newRoleId, User $user);

    /**
     * @param int $pageSize
     * @return mixed
     */
    public function getAllUsers($pageSize = null);

    public function getLocalRoles();

    public function getGlobalRoles();
}