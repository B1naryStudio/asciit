<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Repositories\Entities\Vote;

class VoteWasAdded extends Event
{
    use SerializesModels;

    public $vote;

    /**
     * Create a new event instance.
     *
     * @param Vote $vote
     */
    public function __construct(Vote $vote)
    {
        $this->vote = $vote;
    }
}
