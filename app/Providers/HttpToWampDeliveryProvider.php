<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class HttpToWampDeliveryProvider extends ServiceProvider
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
        $this->app->bind(
            'App\WebSocket\Contracts\HttpToWampDelivery',
            'App\WebSocket\ZeroMQDelivery'
        );
    }
}
