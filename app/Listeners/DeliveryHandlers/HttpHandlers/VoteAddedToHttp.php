<?php
/**
 * Created by PhpStorm.
 * User: Andriy
 * Date: 31.08.2015
 * Time: 17:11
 */

namespace App\Listeners\DeliveryHandlers\HttpHandlers;

use App\Events\VoteWasAdded;
use App\Listeners\Contracts\HttpDeliveryHandler;

class VoteAddedToHttp extends HttpDeliveryHandler
{
    public function handle(VoteWasAdded $event){
        if ($event->vote->answer->question == null) {
            $url = url('/questions/'.$event->vote->question->slug);
            $text = 'New vote was added to you question';
        } else {
            $url = url('/questions/'.$event->vote->answer->question->slug);
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