<?php

namespace App\Services\Preview;

use App\Services\Preview\Contracts\OEmbedPreviewInterface;
use App\Services\Preview\Exceptions\PreviewNotLinkException;
use App\Services\Preview\Exceptions\PreviewNotExecutableException;
use App\Services\RemoteDataGrabber\Contracts\DataGrabberInterface;
use App\Services\RemoteDataGrabber\Exceptions\RemoteDataGrabberException;

class OEmbedPreview implements OEmbedPreviewInterface
{
    /**
     * @var DataGrabberInterface
     */
    private $dataGrabber;

    /**
     * @var array
     */
    private $providers;

    public function __construct(DataGrabberInterface $dataGrabberService)
    {
        $this->dataGrabber = $dataGrabberService;
        $this->providers = config('preview.oembed_providers');
    }

    public function get($url)
    {
        $url_info = parse_url($url);

        $result = '';
        if (
            !empty($url_info['host']) &&
            !empty($this->providers[$url_info['host']])
        ) {
            try {
                $response = $this->dataGrabber->getFromJson(
                    'http://' . $url_info['host'] . '/' .
                    $this->providers[$url_info['host']] . '?url=' .
                    urlencode($url) .'&format=json'
                );
                $result = $response && $response->thumbnail_url ?
                    $response->thumbnail_url :
                    ($response->thumbnail ? $response->thumbnail : '');
            } catch (RemoteDataGrabberException $e) {
                throw new PreviewNotLinkException();
            }
        }

        if (empty($result)) {
            throw new PreviewNotExecutableException();
        }

        return $result;
    }
}