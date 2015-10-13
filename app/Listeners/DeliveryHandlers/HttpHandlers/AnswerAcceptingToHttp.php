<?php

namespace App\Listeners\DeliveryHandlers\HttpHandlers;

use App\Events\AnswerWasAccepted;
use App\Listeners\Contracts\HttpDeliveryHandler;

class AnswerAcceptingToHttp extends HttpDeliveryHandler
{
    public function handle(AnswerWasAccepted $event)
    {
        $prefix = env('SERVER_PREFIX', '');
        $url = url($prefix . '/#questions/' . $event->answer->question->slug);
        $answerAuthorId = $event->answer->user->binary_id;
        $questionAuthorId = $event->answer->question->user->binary_id;

        if ($answerAuthorId === $questionAuthorId ) {
            return;
        }

        $this->delivery->send([
            'title' => 'Best answer',
            'text'  => 'Your answer was accepted as the best!',
            'url'   => $url,
            'users' => [$answerAuthorId]
        ]);
    }
}