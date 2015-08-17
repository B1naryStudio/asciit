<?php

namespace App\Listeners;

use App\Events\CommentWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\WebSocket\Contracts\HttpToWampDelivery;

class CommentToBroadcasting
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
    public function handle(CommentWasAdded $event)
    {
        $message['data'] = $event->comment;
        $message['topic'] = url(
            '/entries/' . $event->comment->q_and_a_id . '/comments'
        );

        $this->delivery->send(json_encode($message));
    }
}
