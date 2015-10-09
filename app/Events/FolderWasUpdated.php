<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Repositories\Entities\Folder;

class FolderWasUpdated extends Event
{
    use SerializesModels;

    public $folder;

    /**
     * @param Folder $folder
     */
    public function __construct(Folder $folder)
    {
        $this->folder = $folder;
    }
}
