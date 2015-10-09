<?php

namespace App\Listeners\DeliveryHandlers\HttpHandlers;

use App\Events\AnswerWasAdded;
use App\Listeners\Contracts\HttpDeliveryHandler;

class AnswerToHttp extends HttpDeliveryHandler
{
    public function handle(AnswerWasAdded $event)
    {
        $this->delivery->send([
            'title' => 'New answer',
            'text' => 'You have a new answer to your question',
            'url' => url('/questions/'.$event->answer->question->slug),
            'users' => [
                $event->answer->question->user->binary_id
            ]
        ]);
    }
}