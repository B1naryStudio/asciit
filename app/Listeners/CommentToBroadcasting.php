<?php

namespace App\Listeners;

use App\Events\CommentWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\WebSocket\Contracts\AbstractWebSocketFactory;

class CommentToBroadcasting extends DeliveryHandler
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
