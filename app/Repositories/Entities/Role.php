<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Role extends Model
{
    protected $fillable = ['title', 'is_global'];
    public $timestamps = false;

    public function users()
    {
        return $this->hasMany('App\Repositories\Entities\User');
    }
}