<?php

namespace App\WebSocket\WAMPServer;

use React\Socket\Server;
use React\EventLoop\Factory;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\Wamp\WampServer;
use App\WebSocket\WampProcessors\WampProcessorForGos;

class WampServerForGos
{
    private $pusher;

    public function __construct(WampProcessorForGos $pusher)
    {
        $this->pusher = $pusher;
    }

    public function run($port)
    {
        $loop   = Factory::create();
        //$pusher = new WampProcessorForGos(); // For messages publishing

        // Listen for the web server to make a ZeroMQ push after an event firing
        //$context = new Context($loop);
        //$pull = $context->getSocket(ZMQ::SOCKET_PULL);

        // Binding to 127.0.0.1 means the only client that can connect is itself
        //$pull->bind('tcp://127.0.0.1:9091');
        //$pull->on('message', array($pusher, 'onNewItem'));

        // Set up our WebSocket server for clients wanting real-time updates
        $webSock = new Server($loop);
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

        $loop->run();
    }
}