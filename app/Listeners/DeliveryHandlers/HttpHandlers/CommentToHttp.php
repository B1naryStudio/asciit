<?php

namespace App\Listeners\DeliveryHandlers\HttpHandlers;

use App\Events\CommentWasAdded;
use App\Listeners\Contracts\HttpDeliveryHandler;

class CommentToHttp extends HttpDeliveryHandler
{
    public function handle(CommentWasAdded $event)
    {
        $prefix = env('SERVER_PREFIX', '');

        if ($event->comment->answer->question == null) {
            $url = url($prefix . '/#questions/'.$event->comment->question->slug);
            $text = 'You have a new comment to your question';
        } else {
            $url = url($prefix
                 . '/#questions/'
                 . $event->comment->answer->question->slug);
            $text = 'You have a new comment to your answer';
        }
        $this->delivery->send([
            'title' => 'New comment',
            'text'  => $text,
            'url'   => $url,
            'users' => [
                $event->comment->question->user->binary_id
            ]
        ]);
    }
}