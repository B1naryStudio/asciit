<?php

namespace App\Listeners;

use App\Events\AnswerWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\WebSocket\Contracts\AbstractWebSocketFactory;

class AnswerToBroadcasting extends DeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  QuestionWasAdded  $event
     * @return void
     */
    public function handle(AnswerWasAdded $event)
    {
        // to the topic 'question/{id}/answers'
        $this->delivery->send([
            'data'  => ['post' => $event->answer],
            'topic' =>'questions/' . $event->answer->question_id . '/answers'
        ]);

        $questionAuthorId = $event->answer->question->user_id;

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
            'topic' =>'questions/' . $event->answer->question_id
        ]);
    }
}
