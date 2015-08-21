<?php

namespace App\Listeners;

use App\Events\QuestionWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class QuestionToBroadcasting extends DeliveryHandler
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
