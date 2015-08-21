<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class WebSocketsServiceProvider extends ServiceProvider
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
            'App\WebSocket\Contracts\AbstractWebSocketFactory',
            'App\WebSocket\Factories\GosWebSocketFactory'
        );
    }
}
