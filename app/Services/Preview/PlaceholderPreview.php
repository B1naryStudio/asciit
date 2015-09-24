<?php

namespace App\Services\Preview;

use App\Services\Preview\Contracts\PlaceholderPreviewInterface;

class PlaceholderPreview implements PlaceholderPreviewInterface
{
    public function get($url)
    {
        return env('LINK_PREVIEW_DEFAULT');
    }
}