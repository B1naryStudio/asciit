<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\FolderWasRemoved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class FolderRemovingToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  FolderWasRemoved  $event
     * @return void
     */
    public function handle(FolderWasRemoved $event)
    {
        // to 'folders' topic
        $this->delivery->send([
            'data'  => ['delete' => $event->folder],
            'topic' =>'folders'
        ]);
    }
}
