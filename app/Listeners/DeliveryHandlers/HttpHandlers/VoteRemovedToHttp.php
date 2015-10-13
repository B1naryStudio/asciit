<?php

namespace App\Listeners\DeliveryHandlers\HttpHandlers;

use App\Events\VoteWasRemoved;
use App\Listeners\Contracts\HttpDeliveryHandler;

class VoteRemovedToHttp extends HttpDeliveryHandler
{
    public function handle(VoteWasRemoved $event)
    {
        $prefix = env('SERVER_PREFIX', '');

        if ($event->vote->answer->question == null) {
            $url = url($prefix . '/#questions/' . $event->vote->question->slug);
            $text = 'Vote was removed from your question';
        } else {
            $url = url($prefix
                 . '/#questions/'
                 . $event->vote->answer->question->slug);
            $text = 'Vote was removed from your answer';
        }
        $this->delivery->send([
            'title' => 'New vote',
            'text'  => $text,
            'url'   => $url,
            'users' => [
                $event->vote->question->user->binary_id
            ]
        ]);
    }
}