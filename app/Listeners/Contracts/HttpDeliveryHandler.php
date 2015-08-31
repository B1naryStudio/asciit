<?php
/**
 * Created by PhpStorm.
 * User: Andriy
 * Date: 30.08.2015
 * Time: 23:45
 */

namespace App\Listeners\Contracts;

use App\Services\Notifications\NotificationService;


class HttpDeliveryHandler extends DeliveryHandler
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(NotificationService $notification)
    {
        $this->delivery = $notification;
    }
}