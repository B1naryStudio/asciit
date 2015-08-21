<?php

namespace App\Listeners;

use App\Events\FolderWasAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class FolderToBroadcasting extends DeliveryHandler
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
