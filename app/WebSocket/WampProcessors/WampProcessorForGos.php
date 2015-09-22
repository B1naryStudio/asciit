<?php

namespace App\WebSocket\WampProcessors;

use App\WebSocket\Contracts\WampProcessor;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\WampServerInterface;

class WampProcessorForGos extends WampProcessor implements WampServerInterface
{
    public function onPublish(ConnectionInterface $conn, $topic, $event, array $exclude, array $eligible)
    {
        // If some coolhatsker try to publish a message from the browser console
        if($conn->remoteAddress !== '127.0.0.1') {
            $this->kickIllegalPublisher($conn);
        }

        echo "Message to the topic '{$topic}' ({$conn->resourceId})\n";

        // re-send the data to all the clients subscribed to that category
        $topic->broadcast($event);
    }
}