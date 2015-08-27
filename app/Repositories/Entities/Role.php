<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Role extends Model
{
    protected $fillable = ['title'];
    public $timestamps = false;

    public function users()
    {
        return $this->belongsToMany('App\Repositories\Entities\User');
    }
}