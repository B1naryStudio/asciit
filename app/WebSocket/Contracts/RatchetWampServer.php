<?php

namespace App\WebSocket\Contracts;

use React\Socket\Server;
use React\EventLoop\Factory;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\Wamp\WampServer;

abstract class RatchetWampServer
{
    protected $pusher;

    protected $loop;

    public function run($port)
    {
        $this->createServerLoop($port);
        $this->loop->run();
    }

    protected function createServerLoop($port)
    {
        $this->loop = Factory::create();

        // Set up our WebSocket server for clients wanting real-time updates
        $webSock = new Server($this->loop);
        $webSock->listen($port, '0.0.0.0'); // Binding to 0.0.0.0 means remotes can connect

        $webServer = new IoServer(
            new HttpServer(
                new WsServer(
                    new WampServer(
                        $this->pusher
                    )
                )
            ),
            $webSock
        );
    }
}