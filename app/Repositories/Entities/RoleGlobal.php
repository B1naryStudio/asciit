<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class RoleGlobal extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'roles';

    protected $fillable = ['title', 'local_id'];

    public $timestamps = false;

    public function users()
    {
        return $this->hasMany('App\Repositories\Entities\User');
    }

    public function local()
    {
        return $this->belongsTo(
            'App\Repositories\Entities\RoleLocal',
            'local_id'
        );
    }
}