<?php

namespace App\Listeners\DeliveryHandlers\HttpHandlers;

use App\Events\VoteWasAdded;
use App\Listeners\Contracts\HttpDeliveryHandler;

class VoteAddedToHttp extends HttpDeliveryHandler
{
    public function handle(VoteWasAdded $event)
    {
        $prefix = env('SERVER_PREFIX', '');

        if ($event->vote->answer->question == null) {
            $url = url($prefix . '/#questions/' . $event->vote->question->slug);
            $text = 'New vote was added to you question';
        } else {
            $url = url($prefix
                 . '/#questions/'
                 . $event->vote->answer->question->slug);
            $text = 'New vote was added to you answer';
        }
        $this->delivery->send([
            'title' => 'New vote',
            'text' => $text,
            'url' => $url,
            'users' => [
                $event->vote->question->user->binary_id
            ]
        ]);
    }
}