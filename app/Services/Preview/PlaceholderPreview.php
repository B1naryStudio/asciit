<?php

namespace App\Services\Preview;

use App\Services\Preview\Contracts\PlaceholderPreviewInterface;

class PlaceholderPreview implements PlaceholderPreviewInterface
{
    public function get($url)
    {
        return config('preview.placeholder');
    }
}