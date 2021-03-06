<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\WebSocket\Contracts\AbstractWebSocketFactory;

class StartSocketServer extends Command
{
    private $server;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sockets:serve';

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
    public function __construct(AbstractWebSocketFactory $factory)
    {
        $this->server = $factory->getWampServer();
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $port = env('WEBSOCKET_PORT', 9090);
        $this->info("Starting chat web socket server on port " . $port);

        $this->server->run($port);
    }
}
