<?php

namespace App\WebSocket\Contracts;

interface AbstractWebSocketFactory
{
    public function getWampServer();

    public function getDeliveryService();
}