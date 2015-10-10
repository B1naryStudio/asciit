<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class RoleGlobal extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = ['title', 'is_global'];
    public $timestamps = false;

    public function users()
    {
        return $this->hasMany('App\Repositories\Entities\User');
    }
}