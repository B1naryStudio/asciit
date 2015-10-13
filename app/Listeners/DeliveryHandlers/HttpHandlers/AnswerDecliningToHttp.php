<?php

namespace App\Listeners\DeliveryHandlers\HttpHandlers;

use App\Events\AnswerWasDeclined;
use App\Listeners\Contracts\HttpDeliveryHandler;

class AnswerDecliningToHttp extends HttpDeliveryHandler
{
    public function handle(AnswerWasDeclined $event)
    {
        $prefix = env('SERVER_PREFIX', '');
        $url = url($prefix . '/#questions/' . $event->answer->question->slug);

        $this->delivery->send([
            'title' => 'Answer declined',
            'text'  => 'Your answer was declined.',
            'url'   => $url,
            'users' => [
                $event->answer->user->binary_id
            ]
        ]);
    }
}