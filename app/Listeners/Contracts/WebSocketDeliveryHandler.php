<?php

namespace App\Listeners\Contracts;

use App\WebSocket\Contracts\AbstractWebSocketFactory;

/*
 *  Http-server -> WAMP-server delivery
 */
class WebSocketDeliveryHandler extends DeliveryHandler
{
    /**
     * @param AbstractWebSocketFactory $factory
     */
    public function __construct(AbstractWebSocketFactory $factory)
    {
        $this->delivery = $factory->getDeliveryService();
    }
}