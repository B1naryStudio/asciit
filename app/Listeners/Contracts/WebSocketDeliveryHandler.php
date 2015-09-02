<?php

namespace App\Listeners\Contracts;

use App\WebSocket\Contracts\AbstractWebSocketFactory;

/*
 *  Http-server -> WAMP-server delivery
 */
class WebSocketDeliveryHandler extends DeliveryHandler
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(AbstractWebSocketFactory $factory)
    {
        $this->delivery = $factory->getDeliveryService();
    }
}