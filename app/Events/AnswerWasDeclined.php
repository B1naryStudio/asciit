<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Repositories\Entities\Answer;

class AnswerWasDeclined extends Event
{
    use SerializesModels;

    public $answer;

    /**
     * @param Answer $answer
     */
    public function __construct(Answer $answer)
    {
        $this->answer = $answer;
    }
}
