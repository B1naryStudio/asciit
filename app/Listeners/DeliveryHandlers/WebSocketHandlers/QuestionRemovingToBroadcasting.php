<?php

namespace App\Listeners;

use App\Events\QuestionWasRemoved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class QuestionRemovingToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  QuestionWasAdded  $event
     * @return void
     */
    public function handle(QuestionWasRemoved $event)
    {
        // to 'questions' topic
        $this->delivery->send([
            'data'  => ['delete' => $event->question],
            'topic' =>'questions'
        ]);

        // to 'user/{id}/questions' topic
        $this->delivery->send([
            'data'  => ['delete' => $event->question],
            'topic' =>'user/' . $event->question->user_id . '/questions'
        ]);
    }
}
