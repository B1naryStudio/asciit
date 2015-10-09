<?php

namespace App\Services\Preview\Contracts;

interface PreviewInterface
{
    /**
     * @param string $url
     * @return string url for image
     */
    public function get($url);
}

?>