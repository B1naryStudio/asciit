<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\AnswerWasUpdated;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class AnswerUpdatingToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  AnswerWasUpdated  $event
     * @return void
     */
    public function handle(AnswerWasUpdated $event)
    {
        // to 'entries/{id}' topic
        $this->delivery->send([
            'data'  => ['patch' => $event->answer],
            'topic' => 'entries/' . $event->answer->question_id
        ]);
    }
}
