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
            'App\Listeners\QuestionToBroadcasting',
        ],
        'App\Events\AnswerWasAdded' => [
            'App\Listeners\AnswerToBroadcasting',
        ],
        'App\Events\CommentWasAdded' => [
            'App\Listeners\CommentToBroadcasting',
        ],
        'App\Events\VoteWasAdded' => [
            'App\Listeners\VoteToBroadcasting',
        ],
        'App\Events\VoteWasRemoved' => [
            'App\Listeners\VoteRemovingToBroadcasting',
        ],
        'App\Events\FolderWasAdded' => [
            'App\Listeners\FolderToBroadcasting',
        ],
        'App\Events\FolderWasUpdated' => [
            'App\Listeners\FolderUpdatingToBroadcasting',
        ],
        'App\Events\FolderWasRemoved' => [
            'App\Listeners\FolderRemovingToBroadcasting',
        ],
        'App\Events\TagWasAdded' => [
            'App\Listeners\TagToBroadcasting',
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
