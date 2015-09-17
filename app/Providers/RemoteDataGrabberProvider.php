<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RemoteDataGrabberProvider extends ServiceProvider
{
    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\Services\RemoteDataGrabber\Contracts\DataGrabber',
            'App\Services\RemoteDataGrabber\CurlDataGrabber'
        );
    }
}
