<?php

namespace App\WebSocket\Contracts;

interface HttpToWampDelivery
{
    public function send(array $data);
}