<?php

namespace App\Listeners\DeliveryHandlers\HttpHandlers;

use App\Events\AnswerWasAdded;
use App\Listeners\Contracts\HttpDeliveryHandler;

class AnswerToHttp extends HttpDeliveryHandler
{
    public function handle(AnswerWasAdded $event)
    {
        $prefix = env('SERVER_PREFIX', '');
        $url = url($prefix . '/#questions/' . $event->answer->question->slug);

        $this->delivery->send([
            'title' => 'New answer',
            'text'  => 'You have a new answer to your question',
            'url'   => $url,
            'users' => [
                $event->answer->question->user->binary_id
            ]
        ]);
    }
}