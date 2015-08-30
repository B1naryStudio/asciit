<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\FolderWasUpdated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Listeners\Contracts\WebSocketDeliveryHandler;

class FolderUpdatingToBroadcasting extends WebSocketDeliveryHandler
{
    /**
     * Handle the event.
     *
     * @param  FolderWasUpdated  $event
     * @return void
     */
    public function handle(FolderWasUpdated $event)
    {
        // to 'folders' topic
        $this->delivery->send([
            'data'  => ['patch' => $event->folder],
            'topic' =>'folders/' . $event->folder->id
        ]);
    }
}