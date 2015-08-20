<?php

namespace App\Listeners;

use App\Events\VoteWasRemoved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class VoteRemovingToBroadcasting extends DeliveryHandler
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

        // to the topic 'questions/{id}' - for model updating
        $this->delivery->send([
            'data'  => [
                'calls' => ['voteDelete' => $event->vote]
            ],
            'topic' =>'questions/' . $event->vote->q_and_a_id
        ]);
    }
}
