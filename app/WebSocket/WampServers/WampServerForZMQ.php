<?php
/**
 * Created by PhpStorm.
 * User: antarus66
 * Date: 8/18/15
 * Time: 12:34 PM
 */

namespace App\WebSocket\WampServers;

use App\WebSocket\Contracts\RatchetWampServer;
use App\WebSocket\WampProcessors\WampProcessorForZMQ;
use React\ZMQ\Context;
use ZMQ;

class WampServerForZMQ extends RatchetWampServer
{
    public function __construct(WampProcessorForZMQ $pusher)
    {
        $this->pusher = $pusher;
    }

    public function run($port)
    {
        $this->createServerLoop($port);
        $this->bindZMQPush();

        $this->loop->run();
    }

    protected function bindZMQPush()
    {
        // Listen for the web server to make a ZeroMQ push after an event firing
        $context = new Context($this->loop);
        $pull = $context->getSocket(ZMQ::SOCKET_PULL);

        // Binding to 127.0.0.1 means the only client that can connect is itself
        $pull->bind('tcp://127.0.0.1:9091');
        $pull->on('message', array($this->pusher, 'onNewItem'));
    }
}