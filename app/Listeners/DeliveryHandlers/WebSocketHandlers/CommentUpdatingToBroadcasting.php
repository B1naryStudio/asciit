<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\CommentWasUpdated;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class CommentUpdatingToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  CommentWasUpdated  $event
     * @return void
     */
    public function handle(CommentWasUpdated $event)
    {
        // to 'comments/{id}' topic
        $this->delivery->send([
            'data'  => ['patch' => $event->comment],
            'topic' => 'comments/' . $event->comment->id,
        ]);
    }
}
