<?php

namespace App\Listeners;

use App\Events\FolderWasRemoved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class FolderRemovingToBroadcasting extends DeliveryHandler
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
