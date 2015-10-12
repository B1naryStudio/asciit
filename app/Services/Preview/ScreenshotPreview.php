<?php

namespace App\Services\Preview;

use App\Services\Preview\Contracts\ScreenshotPreviewInterface;
use App\Services\Preview\Exceptions\PreviewNotExecutableException;
use App\Services\Image\Contracts\ImageServiceInterface;

class ScreenshotPreview implements ScreenshotPreviewInterface
{
    /**
     * @var ImageServiceInterface
     */
    private $imageService;

    public function __construct(ImageServiceInterface $imageService)
    {
        $this->imageService = $imageService;
    }

    public function get($url)
    {
        $config = env('LINK_PREVIEW_SCREENSHOT');
        if ($config) {
            $info = $this->imageService->generateFilename('jpg');
            shell_exec(str_replace(
                ['%url', '%file'],
                [$url, $info['local_path']],
                $config
            ));
        } else {
            throw new PreviewNotExecutableException();
        }
        $newFile = $this->imageService->generateFilename('jpg');

        $this->imageService->resize(
            $info['local_path'],
            $newFile['filename'],
            config('preview.screenshot_width')
        );
        $this->imageService->delete($info['filename'], true);

        return $newFile['url'];
    }
}