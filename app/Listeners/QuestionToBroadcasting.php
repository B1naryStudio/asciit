<?php

namespace App\Listeners;

use App\Events\QuestionWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\WebSocket\Contracts\AbstractWebSocketFactory;

class QuestionToBroadcasting
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
    public function handle(QuestionWasAdded $event)
    {
        // to 'questions' topic
        $this->delivery->send([
            'data'  => $event->question,
            'topic' =>'questions'
        ]);

        $this->delivery->send([
            'data'  => $event->question,
            'topic' =>'user/' . $event->question->user_id . '/questions'
        ]);
    }
}
