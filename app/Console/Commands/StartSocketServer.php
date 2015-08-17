<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Ratchet\Server\IoServer;
use React\Socket\Server;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\Wamp\WampServer;
use App\WebSocket\WampProcessor;
use React\ZMQ\Context;
use React\EventLoop\Factory;
use ZMQ;

class StartSocketServer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sockets:serve
        {--port=9090 : Port where to launch the server.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start websocket server.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $port = intval($this->option('port'));
        $this->info("Starting chat web socket server on port " . $port);

        $loop   = Factory::create();
        $pusher = new WampProcessor(); // For messages publishing

        // Listen for the web server to make a ZeroMQ push after an event firing
        $context = new Context($loop);
        $pull = $context->getSocket(ZMQ::SOCKET_PULL);

        // Binding to 127.0.0.1 means the only client that can connect is itself
        $pull->bind('tcp://127.0.0.1:9091');
        $pull->on('message', array($pusher, 'onNewItem'));

        // Set up our WebSocket server for clients wanting real-time updates
        $webSock = new Server($loop);
        $webSock->listen($port, '0.0.0.0'); // Binding to 0.0.0.0 means remotes can connect

        $webServer = new IoServer(
            new HttpServer(
                new WsServer(
                    new WampServer(
                        $pusher
                    )
                )
            ),
            $webSock
        );

        $loop->run();
    }
}
