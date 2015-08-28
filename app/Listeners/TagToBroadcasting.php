<?php

namespace App\Listeners;

use App\Events\TagWasAdded;

class TagToBroadcasting extends DeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  TagWasAdded  $event
     * @return void
     */
    public function handle(TagWasAdded $event)
    {
        // to 'tags' topic
        $this->delivery->send([
            'data'  => ['post' => $event->tag],
            'topic' => 'tags'
        ]);
    }
}
