<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\VoteWasRemoved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class VoteRemovingToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  VoteWasRemoved  $event
     * @return void
     */
    public function handle(VoteWasRemoved $event)
    {
        // to 'entry/{id}/votes' topic
        $this->delivery->send([
            'data'  => ['delete' => $event->vote],
            'topic' =>'entry/' . $event->vote->q_and_a_id . '/votes'
        ]);

        // to the topic 'entries/{id}' - for model updating
        $this->delivery->send([
            'data'  => [
                'calls' => ['voteDelete' => $event->vote]
            ],
            'topic' =>'entries/' . $event->vote->q_and_a_id
        ]);
    }
}
