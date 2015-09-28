<?php

namespace App\Services\Preview;
use App\Services\Preview\Contracts\PreviewServiceInterface;
use App\Services\Preview\Contracts\OpenGraphPreviewInterface;
use App\Services\Preview\Contracts\OEmbedPreviewInterface;
use App\Services\Preview\Contracts\PlaceholderPreviewInterface;
use App\Services\Preview\Contracts\ScreenshotPreviewInterface;
use App\Services\Preview\Exceptions\PreviewException;

class PreviewService implements PreviewServiceInterface
{
    /**
     * @var array
     */
    private $services;

    public function __construct(
        OpenGraphPreviewInterface $openGraph,
        OEmbedPreviewInterface $oembed,
        ScreenshotPreviewInterface $screenshot,
        PlaceholderPreviewInterface $placeholder
    )
    {
        $this->services[] = $oembed;
        $this->services[] = $openGraph;
        $this->services[] = $screenshot;
        $this->services[] = $placeholder;
    }

    /**
     * @param $url string
     * @return string url for image
     */
    public function get($url)
    {
        $preview = '';
        foreach ($this->services as $service) {
            /* @var $service PreviewServiceInterface */
            try {
                $preview = $service->get($url);
                break;
            } catch (PreviewException $e) {}
        }
        return $preview;
    }
}

?>