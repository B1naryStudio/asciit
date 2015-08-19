<?php
/**
 * Created by PhpStorm.
 * User: antarus66
 * Date: 8/18/15
 * Time: 12:49 PM
 */

namespace App\WebSocket\Factories;

use App\WebSocket\Contracts\AbstractWebSocketFactory;
use App\WebSocket\Delivery\ZeroMQDelivery;
use App\WebSocket\WampServers\WampServerForZMQ;
use App\WebSocket\WampProcessors\WampProcessorForZMQ;

class ZeroMQWebSocketFactory implements AbstractWebSocketFactory
{
    private $delivery;
    private $processor;
    private $server;

    public function __construct(
        ZeroMQDelivery $delivery,
        WampProcessorForZMQ $processor
    ) {
        $this->delivery = $delivery;
        $this->processor = $processor;
    }

    public function getWampServer()
    {
        if (!$this->server) {
            $this->server = new WampServerForZMQ($this->processor);
        }

        return $this->server;
    }

    public function getDeliveryService()
    {
        return $this->delivery;
    }
}