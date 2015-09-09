<?php

namespace App\Rbac\Facades;

use Illuminate\Support\Facades\Facade;

class Ownership extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'App\Rbac\Contracts\OwnershipChecker';
    }
}