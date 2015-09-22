<?php

namespace App\WebSocket\Contracts;

use Ratchet\ConnectionInterface;

abstract class WampProcessor {
    public function onSubscribe(ConnectionInterface $conn, $topic)
    {
        echo "Connection {$conn->resourceId} subscribed on {$topic}\n";
    }

    public function onUnSubscribe(ConnectionInterface $conn, $topic)
    {
        echo "Connection {$conn->resourceId} unsubscribed from {$topic}\n";
    }

    public function onOpen(ConnectionInterface $conn)
    {
        echo "New connection on {$conn->remoteAddress} ({$conn->resourceId})\n";
    }

    public function onClose(ConnectionInterface $conn)
    {
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onCall(ConnectionInterface $conn, $id, $topic, array $params)
    {
        // In this application if clients send data it's because the user hacked around in console
        $conn->callError($id, $topic, 'You are not allowed to make calls')->close();
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "Websockets error! "
            . $e->getMessage()
            . "\n";
    }

    protected function kickIllegalPublisher($conn)
    {
        echo "Illegal publisher from {$conn->remoteAddress} "
            . "({$conn->resourceId})\n";

        $conn->close(); // Kick it!
    }
}