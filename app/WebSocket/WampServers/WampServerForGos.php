<?php

namespace App\WebSocket\WampServers;

use App\WebSocket\Contracts\RatchetWampServer;
use App\WebSocket\WampProcessors\WampProcessorForGos;

class WampServerForGos extends RatchetWampServer
{
    public function __construct(WampProcessorForGos $pusher)
    {
        $this->pusher = $pusher;
    }
}