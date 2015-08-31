<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\TagWasAdded;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class TagToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  TagWasAdded  $event
     * @return void
     */
    public function handle(TagWasAdded $event)
    {
        // to 'tags' topic
        $this->delivery->send([
            'data'  => ['post' => $event->tag],
            'topic' => 'tags'
        ]);
    }
}
