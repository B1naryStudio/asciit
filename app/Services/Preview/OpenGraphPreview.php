<?php

namespace App\Services\Preview;

use App\Services\Preview\Contracts\OpenGraphPreviewInterface;
use App\Services\Preview\Exceptions\PreviewNotLinkException;
use App\Services\RemoteDataGrabber\Contracts\DataGrabberInterface;
use App\Services\Preview\Exceptions\PreviewNotExecutableException;
use App\Services\RemoteDataGrabber\Exceptions\RemoteDataGrabberException;

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
        try {
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

            $result = strlen($result) !== strlen($head) ? $result : '';
        } catch (RemoteDataGrabberException $e) {
            throw new PreviewNotLinkException();
        }

        if (empty($result)) {
            throw new PreviewNotExecutableException();
        }

        return $result;
    }
}