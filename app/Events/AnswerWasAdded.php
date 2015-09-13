<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Repositories\Entities\Answer;

class AnswerWasAdded extends Event
{
    use SerializesModels;

    public $answer;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Answer $answer)
    {
        $this->answer = $answer;
    }
}
