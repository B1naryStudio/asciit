<?php

namespace App\Repositories\Repositories;

use App\Repositories\Criteria\InCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Entities\Tag;
use App\Repositories\Contracts\TagRepository;
use Illuminate\Support\Facades\DB;

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

    public function createSeveral(array $attributes)
    {
        foreach ($attributes as $model_attributes) {
            if ( !is_null($this->validator) ) {
                $this->validator->with($model_attributes)
                    ->passesOrFail( ValidatorInterface::RULE_CREATE );
            }
        }

        $model = $this->makeModel();
        DB::table($model->getTable())->insert($attributes);

        $titles = [];
        foreach ($attributes as $attribute) {
            $titles[] = $attribute['title'];
        }

        $this->pushCriteria(new InCriteria('title', $titles));

        $tags = [];
        $all = $this->all();
        foreach ($all as $tag) {
            $tags[] = $tag;
        }

        return $tags;
    }
}