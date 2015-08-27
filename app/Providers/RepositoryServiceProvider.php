<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            'App\Repositories\Contracts\UserRepository',
            'App\Repositories\Repositories\UserRepositoryEloquent'
        );

        $this->app->singleton(
            'App\Repositories\Contracts\QuestionRepository',
            'App\Repositories\Repositories\QuestionRepositoryEloquent'
        );

        $this->app->singleton(
            'App\Repositories\Contracts\FolderRepository',
            'App\Repositories\Repositories\FolderRepositoryEloquent'
        );

        $this->app->singleton(
            'App\Repositories\Contracts\AnswerRepository',
            'App\Repositories\Repositories\AnswerRepositoryEloquent'
        );

        $this->app->singleton(
            'App\Repositories\Contracts\TagRepository',
            'App\Repositories\Repositories\TagRepositoryEloquent'
        );

        $this->app->singleton(
            'App\Repositories\Contracts\VoteRepository',
            'App\Repositories\Repositories\VoteRepositoryEloquent'
        );

        $this->app->singleton(
            'App\Repositories\Contracts\CommentRepository',
            'App\Repositories\Repositories\CommentRepositoryEloquent'
        );

        $this->app->singleton(
            'App\Repositories\Contracts\RoleRepository',
            'App\Repositories\Repositories\RoleRepositoryEloquent'
        );
    }
}
