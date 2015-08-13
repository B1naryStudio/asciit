<?php
/**
 * Created by PhpStorm.
 * User: Andriy
 * Date: 10.08.2015
 * Time: 16:12
 */

namespace App\Repositories\Repositories;

use App\Repositories\Entities\Comment;
use App\Repositories\Contracts\CommentRepository;


class CommentRepositoryEloquent extends Repository implements CommentRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Comment::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        //
    }
}
