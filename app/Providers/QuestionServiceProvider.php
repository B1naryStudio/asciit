<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class QuestionServiceProvider extends ServiceProvider
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
            'App\QuestionService\Contracts\QuestionServiceInterface',
            'App\QuestionService\QuestionService'
        );
    }
}
