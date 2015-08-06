<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Question extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'q_and_a';

    protected $fillable = ['title', 'description', 'user_id', 'folder_id'];

    protected $hidden = ['question_id'];

    protected $appends = ['answers_count'];

    public function user()
    {
        return $this->belongsTo('App\Repositories\Entities\User');
    }

    public function folder()
    {
        return $this->belongsTo('App\Repositories\Entities\Folder');
    }

    public function answers()
    {
        return $this->hasMany('App\Repositories\Entities\Answer');
    }

    public function getAnswersCountAttribute()
    {
        return $this->answers()->count();
    }
}
