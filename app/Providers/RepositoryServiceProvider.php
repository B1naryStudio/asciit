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
            'App\Repositories\Repositories\UserRepository',
            'App\Repositories\Repositories\UserRepositoryEloquent'
        );

        $this->app->singleton(
            'App\Repositories\Repositories\QuestionRepository',
            'App\Repositories\Repositories\QuestionRepositoryEloquent'
        );

        $this->app->singleton(
            'App\Repositories\Repositories\FolderRepository',
            'App\Repositories\Repositories\FolderRepositoryEloquent'
        );

        $this->app->singleton(
            'App\Repositories\Repositories\AnswerRepository',
            'App\Repositories\Repositories\AnswerRepositoryEloquent'
        );
    }
}
