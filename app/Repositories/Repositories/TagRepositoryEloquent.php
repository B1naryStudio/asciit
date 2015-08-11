<?php

namespace App\Repositories\Repositories;

use App\Repositories\Criteria\relationCountCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Entities\Tag;
use App\Repositories\Contracts\TagRepository;

/**
 * Class TagRepositoryEloquent
 * @package namespace App\RepositoriesRepositories;
 */
class TagRepositoryEloquent extends Repository implements TagRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Tag::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function getRelationCount($relation, $table, $count, $order = array())
    {
        if (empty($order)) {
            $order = array('total', 'desc');
        }

        $model = $this->makeModel();
        $r = $model->$relation()
            ->select('tags.*')
            ->selectRaw('count(*) as total')
            ->join('tags', 'tags.id', '=', $table . '.tag_id')
            ->groupBy('tag_id')
            ->orWhereNotNull($table . '.tag_id')
            ->orderBy($order[0], $order[1])
            ->orderBy('title')
            ->limit($count);

        return $r->get();
    }
}