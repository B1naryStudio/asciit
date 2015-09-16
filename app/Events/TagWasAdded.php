<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Repositories\Entities\Tag;

class TagWasAdded extends Event
{
    use SerializesModels;

    public $tag;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Tag $tag)
    {
        $this->tag = $tag;
    }
}
