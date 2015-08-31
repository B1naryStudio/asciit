<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\FolderWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class FolderToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  FolderWasAdded  $event
     * @return void
     */
    public function handle(FolderWasAdded $event)
    {
        // to 'folders' topic
        $this->delivery->send([
            'data'  => ['post' => $event->folder],
            'topic' =>'folders'
        ]);
    }
}
