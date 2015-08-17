<?php

namespace App\Listeners;

use App\Events\QuestionWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\WebSocket\Contracts\HttpToWampDelivery;

class QuestionToBroadcasting
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
    public function handle(QuestionWasAdded $event)
    {
        $message['data'] = $event->question;
        $message['topic'] = url('/questions');

        $this->delivery->send(json_encode($message));
    }
}
