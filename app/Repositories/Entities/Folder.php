<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Folder extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = ['title'];

    public $timestamps = false;

    public function questions()
    {
        return $this->hasMany('App\Repositories\Entities\Question');
    }
}
