<?php

namespace App\WebSocket;

use Ratchet\ConnectionInterface;
use Ratchet\Wamp\WampServerInterface;

class WampProcessor implements WampServerInterface {
    /**
     * A lookup of all the topics clients have subscribed to
     */
    protected $subscribedTopics = array();

    /**
     * @param string JSON'ified string we'll receive from ZeroMQ
     */
    public function onNewItem($data) {
        $decodedData = json_decode($data, true);

        echo "Got a message on topic:\n" . $decodedData['topic'] . "\n";
        echo var_dump($decodedData);

        // If the lookup topic object isn't set there is no one to publish to
        if (!array_key_exists($decodedData['topic'], $this->subscribedTopics)) {
            return;
        }

        $topic = $this->subscribedTopics[$decodedData['topic']];

        // re-send the data to all the clients subscribed to that category
        $topic->broadcast($decodedData['data']);
    }

    public function onSubscribe(ConnectionInterface $conn, $topic)
    {
        $this->subscribedTopics[$topic->getId()] = $topic;
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
        // In this application if clients send data it's because the user hacked around in console
        $conn->close();
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {}
}