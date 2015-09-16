<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Repositories\Entities\Folder;

class FolderWasRemoved extends Event
{
    use SerializesModels;

    public $folder;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Folder $folder)
    {
        $this->folder = $folder;
    }
}
