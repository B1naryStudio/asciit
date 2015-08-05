<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Tag extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'tags';

    protected $fillable = ['title'];

    public function questions()
    {
        return $this->belongsToMany('App\Repositories\Entities\Question', 'tag_q_and_a');
    }
}
