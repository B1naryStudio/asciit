<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Repositories\Entities\Vote;

class VoteWasRemoved extends Event
{
    use SerializesModels;

    public $vote;

    /**
     * @param Vote $vote
     */
    public function __construct(Vote $vote)
    {
        $this->vote = $vote;
    }
}
