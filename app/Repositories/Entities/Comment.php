<?php
/**
 * Created by PhpStorm.
 * User: Andriy
 * Date: 10.08.2015
 * Time: 15:07
 */

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Comment extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'comment';

    protected $fillable = ['text', 'user_id', 'q_and_a_id'];

    public function question()
    {
        return $this->belongsTo('App\Repositories\Entities\Question');
    }

    public function answer()
    {
        return $this->belongsTo('App\Repositories\Entities\Answer');
    }

    public function user()
    {
        return $this->belongsTo('App\Repositories\Entities\User');
    }
}
