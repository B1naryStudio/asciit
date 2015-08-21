<?php

namespace App\Listeners;

use App\Events\FolderWasUpdated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class FolderUpdatingToBroadcasting extends DeliveryHandler
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