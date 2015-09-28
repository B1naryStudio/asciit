<?php

namespace App\Services\Preview;
use App\Services\Preview\Contracts\PreviewServiceInterface;
use App\Services\Preview\Exceptions\PreviewException;
use \Illuminate\Contracts\Foundation\Application;

class PreviewService implements PreviewServiceInterface
{
    /**
     * @var array
     */
    private $providers;

    public function __construct(Application $app)
    {
        $providers_classes = config('preview.screenshot_providers');
        foreach ($providers_classes as $class) {
            $this->providers[] = $app->make($class);
        }
    }

    /**
     * @param $url string
     * @return string url for image
     */
    public function get($url)
    {
        $preview = '';
        foreach ($this->providers as $provider) {
            /* @var $provider PreviewServiceInterface */
            try {
                $preview = $provider->get($url);
                break;
            } catch (PreviewException $e) {}
        }
        return $preview;
    }
}

?>