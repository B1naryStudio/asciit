<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class RoleLocal extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'roles';

    protected $fillable = ['title'];
    public $timestamps = false;

    public function users()
    {
        return $this->hasMany('App\Repositories\Entities\User');
    }
}