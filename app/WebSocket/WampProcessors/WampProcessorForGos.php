<?php

namespace App\WebSocket\WampProcessors;

use Ratchet\ConnectionInterface;
use Ratchet\Wamp\WampServerInterface;

class WampProcessorForGos implements WampServerInterface
{
    /**
     * A lookup of all the topics clients have subscribed to
     */
    //protected $subscribedTopics = array();

    public function onSubscribe(ConnectionInterface $conn, $topic)
    {
        //$this->subscribedTopics[$topic->getId()] = $topic;
        echo "Connection {$conn->resourceId} subscribed on {$topic}";
    }

    public function onUnSubscribe(ConnectionInterface $conn, $topic)
    {}

    public function onOpen(ConnectionInterface $conn)
    {
        echo "New connection! ({$conn->resourceId})\n";
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

    public function onPublish(ConnectionInterface $conn, $topic, $event, array $exclude, array $eligible)
    {
        echo "Got a message on topic:\n" . $topic . "\n";
        echo var_dump($event);

        // re-send the data to all the clients subscribed to that category
        $topic->broadcast($event);
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {}
}