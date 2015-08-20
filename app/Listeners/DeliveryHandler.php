<?php
/**
 * Created by PhpStorm.
 * User: antarus66
 * Date: 8/20/15
 * Time: 10:08 AM
 */

namespace App\Listeners;

use App\WebSocket\Contracts\AbstractWebSocketFactory;

abstract class DeliveryHandler {
    protected $delivery;
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