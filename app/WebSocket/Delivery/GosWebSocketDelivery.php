<?php

namespace App\WebSocket\Delivery;

use App\WebSocket\Contracts\HttpToWampDelivery;
use Gos\Component\WebSocketClient\Wamp\Client;

class GosWebSocketDelivery implements HttpToWampDelivery
{
    private $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function send($data)
    {
        $this->client->connect();
        $this->client->publish($data['topic'], $data['data']);
    }
}