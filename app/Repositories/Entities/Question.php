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

    public function user()
    {
        return $this->belongsTo('App\Repositories\Entities\User');
    }

    public function folder()
    {
        return $this->belongsTo('App\Repositories\Entities\Folder');
    }

    public function tags()
    {
        return $this->belongsToMany('App\Repositories\Entities\Tag', 'tag_q_and_a', 'q_and_a_id', 'tag_id');
    }
}
