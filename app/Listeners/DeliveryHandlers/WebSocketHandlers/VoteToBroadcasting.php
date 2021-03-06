<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\VoteWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class VoteToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  VoteWasAdded  $event
     * @return void
     */
    public function handle(VoteWasAdded $event)
    {
        // to 'entry/{id}/votes' topic
        $this->delivery->send([
            'data'  => ['post' => $event->vote],
            'topic' =>'entry/' . $event->vote->q_and_a_id . '/votes'
        ]);

        // to the topic 'entries/{id}' - for model updating
        $this->delivery->send([
            'data'  => [
                'calls' => ['voteAdd' => $event->vote]
            ],
            'topic' =>'entries/' . $event->vote->q_and_a_id
        ]);
    }
}
