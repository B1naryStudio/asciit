<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\QuestionWasUpdated;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class QuestionUpdatingToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  QuestionWasUpdated  $event
     * @return void
     */
    public function handle(QuestionWasUpdated $event)
    {
        // to 'entries/{id}' topic
        $this->delivery->send([
            'data'  => ['patch' => $event->question],
            'topic' => 'entries/' . $event->question->id
        ]);
    }
}
