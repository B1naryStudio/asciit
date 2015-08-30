<?php
/**
 * Created by PhpStorm.
 * User: Andriy
 * Date: 30.08.2015
 * Time: 23:45
 */

namespace App\Listeners\Contracts;




class HttpDeliveryHandler extends DeliveryHandler
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