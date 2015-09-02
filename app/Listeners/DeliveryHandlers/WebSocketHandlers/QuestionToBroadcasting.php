<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\QuestionWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class QuestionToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  QuestionWasAdded  $event
     * @return void
     */
    public function handle(QuestionWasAdded $event)
    {
        // to 'questions' topic
        $this->delivery->send([
            'data'  => ['post' => $event->question],
            'topic' =>'questions'
        ]);

        // to 'user/{id}/questions' topic
        $this->delivery->send([
            'data'  => ['post' => $event->question],
            'topic' =>'user/' . $event->question->user_id . '/questions'
        ]);
    }
}
