<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\AnswerWasRemoved;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class AnswerRemovingToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  AnswerWasRemoved  $event
     */
    public function handle(AnswerWasRemoved $event)
    {
        // to 'answers' topic
        $this->delivery->send([
            'data'  => ['delete' => $event->answer],
            'topic' =>'questions/' . $event->answer->question_id . '/answers'
        ]);

        // to 'user/{id}/answers' topic
        $this->delivery->send([
            'data'  => ['delete' => $event->answer],
            'topic' =>'user/' . $event->answer->user_id . '/questions-answers'
        ]);
    }
}
