<?php
/**
 * Created by PhpStorm.
 * User: antarus66
 * Date: 8/18/15
 * Time: 11:23 AM
 */

namespace App\WebSocket\Factories;

use App\WebSocket\Contracts\AbstractWebSocketFactory;
use App\WebSocket\Delivery\GosWebSocketDelivery;
use App\WebSocket\WampProcessors\WampProcessorForGos;
use App\WebSocket\WampServers\WampServerForGos;

class GosWebSocketFactory implements AbstractWebSocketFactory
{
    private $delivery;
    private $processor;
    private $server;

    public function __construct(
        GosWebSocketDelivery $delivery,
        WampProcessorForGos $processor
    ) {
        $this->delivery = $delivery;
        $this->processor = $processor;
    }

    public function getWampServer()
    {
        if (!$this->server) {
            $this->server = new WampServerForGos($this->processor);
        }

        return $this->server;
    }

    public function getDeliveryService()
    {
        return $this->delivery;
    }
}