<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ImageProvider extends ServiceProvider
{
    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            'App\Services\Image\Contracts\ImageServiceInterface',
            'App\Services\Image\ImageService'
        );
        $this->mergeConfigFrom(__DIR__ . '/../../config/images.php', 'images');
    }

    public function boot()
    {
        $this->publishes([
            __DIR__ . '/../../config/images.php' => config_path('images.php')
        ]);
    }
}
