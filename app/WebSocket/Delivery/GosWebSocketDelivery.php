<?php

namespace App\WebSocket\Delivery;

use App\WebSocket\Contracts\HttpToWampDelivery;
use Gos\Component\WebSocketClient\Wamp\Client;
use Gos\Component\WebSocketClient\Exception\BadResponseException;

class GosWebSocketDelivery implements HttpToWampDelivery
{
    private $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function send($data)
    {
        try {
            $this->client->connect();
        } catch (BadResponseException $e) {
            return;
        }

        $this->client->publish($data['topic'], $data['data']);
    }
}