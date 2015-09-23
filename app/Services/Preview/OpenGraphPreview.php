<?php

namespace App\Services\Preview;

use App\Services\Preview\Contracts\OpenGraphPreviewInterface;
use App\Services\RemoteDataGrabber\Contracts\DataGrabberInterface;

class OpenGraphPreview implements OpenGraphPreviewInterface
{
    /**
     * @var DataGrabberInterface
     */
    private $dataGrabber;

    public function __construct(DataGrabberInterface $dataGrabberService)
    {
        $this->dataGrabber = $dataGrabberService;
    }

    public function get($url)
    {
        $head = $this->dataGrabber->getHtmlHead($url);
        $result = preg_replace(
            "/(.*)meta\\s*property=\"og:image\"\\s*content=\"(.+?)\"(.*)/s",
            '$2',
            $head
        );
        if (strlen($result) === strlen($head)) {
            // check <meta content="..." property="og:image">
            $result = preg_replace(
                "/(.*)meta\\s*content=\"(.+?)\"\\s*property=\"og:image\"(.*)/s",
                '$2',
                $head
            );
        }
        return strlen($result) !== strlen($head) ? $result : '';
    }
}