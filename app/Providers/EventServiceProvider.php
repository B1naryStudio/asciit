<?php

namespace App\Providers;

use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\QuestionWasAdded' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\QuestionToBroadcasting',
        ],
        'App\Events\QuestionWasRemoved' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\QuestionRemovingToBroadcasting',
        ],
        'App\Events\AnswerWasAdded' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\AnswerToBroadcasting',
            'App\Listeners\DeliveryHandlers\HttpHandlers\AnswerToHttp',
        ],
        'App\Events\AnswerWasUpdated' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\AnswerUpdatingToBroadcasting'
        ],
        'App\Events\AnswerWasRemoved' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\AnswerRemovingToBroadcasting',
        ],
        'App\Events\CommentWasAdded' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\CommentToBroadcasting',
            'App\Listeners\DeliveryHandlers\HttpHandlers\CommentToHttp',
        ],
        'App\Events\CommentWasUpdated' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\CommentUpdatingToBroadcasting',
        ],
        'App\Events\CommentWasRemoved' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\CommentRemovingToBroadcasting',
        ],
        'App\Events\VoteWasAdded' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\VoteToBroadcasting',
            'App\Listeners\DeliveryHandlers\HttpHandlers\VoteAddedToHttp',
        ],
        'App\Events\VoteWasRemoved' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\VoteRemovingToBroadcasting',
            'App\Listeners\DeliveryHandlers\HttpHandlers\VoteRemovedToHttp',
        ],
        'App\Events\FolderWasAdded' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\FolderToBroadcasting',
        ],
        'App\Events\FolderWasUpdated' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\FolderUpdatingToBroadcasting',
        ],
        'App\Events\FolderWasRemoved' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\FolderRemovingToBroadcasting',
        ],
        'App\Events\TagWasAdded' => [
            'App\Listeners\DeliveryHandlers\WebSocketHandlers\TagToBroadcasting',
        ],
    ];

    /**
     * Register any other events for your application.
     *
     * @param  \Illuminate\Contracts\Events\Dispatcher  $events
     * @return void
     */
    public function boot(DispatcherContract $events)
    {
        parent::boot($events);

        //
    }
}
