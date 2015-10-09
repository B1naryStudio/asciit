<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Repositories\Entities\Question;

class QuestionWasAdded extends Event
{
    use SerializesModels;

    public $question;

    /**
     * @param Question $question
     */
    public function __construct(Question $question)
    {
        $this->question = $question;
    }
}
