<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\CommentWasRemoved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class CommentRemovingToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  CommentWasRemoved  $event
     * @return void
     */
    public function handle(CommentWasRemoved $event)
    {
        // to the topic 'entries/{id}/comments'
        $this->delivery->send([
            'data'  => ['delete' => $event->comment],
            'topic' => 'entries/'
                . $event->comment->q_and_a_id
                . '/comments'
        ]);
    }
}
