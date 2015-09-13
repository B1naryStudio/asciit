<?php

namespace App\Listeners\DeliveryHandlers\WebSocketHandlers;

use App\Events\QuestionWasUpdated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class QuestionUpdatingToBroadcasting
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  QuestionWasUpdated  $event
     * @return void
     */
    public function handle(QuestionWasUpdated $event)
    {
        //
    }
}
