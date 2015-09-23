<?php

namespace App\Services\Preview;

use App\Services\Preview\Contracts\OEmbedPreviewInterface;
use App\Services\RemoteDataGrabber\Contracts\DataGrabberInterface;

class OEmbedPreview implements OEmbedPreviewInterface
{
    /**
     * @var DataGrabberInterface
     */
    private $dataGrabber;

    /**
     * @var string
     */
    private $configFile = '../.oembed-providers';

    /**
     * @var array
     */
    private $providers;

    public function __construct(DataGrabberInterface $dataGrabberService)
    {
        $this->dataGrabber = $dataGrabberService;
        $this->loadProviders();
    }

    private function loadProviders()
    {
        $this->providers = [];
        $handle = fopen($this->configFile, 'r');
        while (!feof($handle)) {
            $tmp = trim(fgets($handle));
            $config = explode('=', $tmp);
            if (!empty($config[1])) {
                $this->providers[$config[0]] = $config[1];
            }
        }
        fclose($handle);
    }

    public function get($url)
    {
        $url_info = parse_url($url);

        $result = '';
        if (!empty($this->providers[$url_info['host']])) {
            $response = $this->dataGrabber->getFromJson(
                'http://' . $url_info['host'] . '/' .
                $this->providers[$url_info['host']] . '?url=' .
                urlencode($url) .'&format=json'
            );
            $result = $response && $response->thumbnail_url ?
                $response->thumbnail_url :
                ($response->thumbnail ? $response->thumbnail : '');
        }

        return $result;
    }
}