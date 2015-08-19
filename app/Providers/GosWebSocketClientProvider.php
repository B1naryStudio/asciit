<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Gos\Component\WebSocketClient\Wamp\Client;

class GosWebSocketClientProvider extends ServiceProvider
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
        // WAMP-client for publishing events from application.
        $this->app->bind(
            'Gos\Component\WebSocketClient\Wamp\Client',
            function () {
                $client = new Client("127.0.0.1", '9090');

                return $client;
            }
        );
    }
}
