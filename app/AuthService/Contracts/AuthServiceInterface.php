<?php
/**
 * Created by PhpStorm.
 * User: antarus66
 * Date: 8/6/15
 * Time: 9:52 AM
 */
namespace App\AuthService\Contracts;

interface AuthServiceInterface
{
    public function authenticate($data);

    public function logout();
}