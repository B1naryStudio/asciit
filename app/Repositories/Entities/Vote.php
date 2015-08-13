<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Vote extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = ['sign', 'user_id', 'q_and_a_id'];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo('App\Repositories\Entities\User');
    }
}
