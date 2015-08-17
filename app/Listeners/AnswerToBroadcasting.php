<?php

namespace App\Listeners;

use App\Events\AnswerWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\WebSocket\Contracts\HttpToWampDelivery;

class AnswerToBroadcasting
{
    private $delivery;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(HttpToWampDelivery $delivery)
    {
        $this->delivery = $delivery;
    }

    /**
     * Handle the event.
     *
     * @param  QuestionWasAdded  $event
     * @return void
     */
    public function handle(AnswerWasAdded $event)
    {
        $message['data'] = $event->answer;
        $message['topic'] = url(
            '/questions' . $event->answer->question_id . '/answers'
        );

        $this->delivery->send(json_encode($message));
    }
}
