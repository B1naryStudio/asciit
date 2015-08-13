<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Answer extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'q_and_a';

    protected $fillable = ['description', 'user_id', 'question_id'];

    protected $hidden = ['title', 'folder_id'];

    public function user()
    {
        return $this->belongsTo('App\Repositories\Entities\User');
    }

    public function question()
    {
        return $this->belongsTo('App\Repositories\Entities\Question');
    }

    public function votes()
    {
        return $this->hasMany('App\Repositories\Entities\Vote', 'q_and_a_id');
    }
}