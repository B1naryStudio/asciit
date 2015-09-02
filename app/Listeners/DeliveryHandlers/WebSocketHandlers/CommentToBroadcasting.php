<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\CommentWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class CommentToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  QuestionWasAdded  $event
     * @return void
     */
    public function handle(CommentWasAdded $event)
    {
        // to the topic 'entries/{id}/comments'
        $this->delivery->send([
            'data'  => ['post' => $event->comment],
            'topic' => 'entries/'
                    . $event->comment->q_and_a_id
                    . '/comments'
        ]);
    }
}
