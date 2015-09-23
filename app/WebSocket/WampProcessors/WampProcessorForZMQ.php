<?php

namespace App\WebSocket\WampProcessors;
use App\WebSocket\Contracts\WampProcessor;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\WampServerInterface;

class WampProcessorForZMQ extends WampProcessor implements WampServerInterface {
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
        parent::onSubscribe($conn, $topic); // Message output
    }

    public function onUnsubscribe(ConnectionInterface $conn, $topic)
    {
        unset($this->subscribedTopics[$topic->getId()]);
        parent::onSubscribe($conn, $topic); // Message output
    }

    public function onPublish(ConnectionInterface $conn, $topic, $event, array $exclude, array $eligible)
    {
        // In this application if clients send data it's because the user hacked around in console
        $this->kickIllegalPublisher($conn);
    }
}