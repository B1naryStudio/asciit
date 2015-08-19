<?php

namespace App\Listeners;

use App\Events\AnswerWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\WebSocket\Contracts\AbstractWebSocketFactory;

class AnswerToBroadcasting
{
    private $delivery;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(AbstractWebSocketFactory $factory)
    {
        $this->delivery = $factory->getDeliveryService();
    }

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
            'data'  => $event->answer,
            'topic' =>'questions/' . $event->answer->question_id . '/answers'
        ]);

        $questionAuthorId = $event->answer->question->user_id;

        // to the topic 'user/{id}/questions-answers'
        $this->delivery->send([
            'data'  => $event->answer,
            'topic' =>'user/' . $questionAuthorId . '/questions-answers'
        ]);
    }
}
