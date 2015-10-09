<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\AnswerWasAdded;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class AnswerToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  AnswerWasAdded  $event
     */
    public function handle(AnswerWasAdded $event)
    {
        // to the topic 'question/{id}/answers'
        $this->delivery->send([
            'data'  => ['post' => $event->answer],
            'topic' =>'questions/' . $event->answer->question_id . '/answers'
        ]);

        $questionAuthorId = $event->answer->user_id;

        // to the topic 'user/{id}/questions-answers'
        $this->delivery->send([
            'data'  => ['post' => $event->answer],
            'topic' =>'user/' . $questionAuthorId . '/questions-answers'
        ]);

        // to the topic 'questions/{id}' - for model updating
        $this->delivery->send([
            'data'  => [
                // remote func name must be an array key
                'calls' => ['answerAdd' => null]
            ],
            'topic' =>'entries/' . $event->answer->question_id
        ]);
    }
}
