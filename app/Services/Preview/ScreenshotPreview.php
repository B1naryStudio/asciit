<?php

namespace App\Services\Preview;

use App\Services\Preview\Contracts\ScreenshotPreviewInterface;

class ScreenshotPreview implements ScreenshotPreviewInterface
{
    /**
     * @var string
     */
    private $folder = '/images/';

    private function resize($path, $desired_width)
    {
        $source_image = imagecreatefrompng($path);
        $width = imagesx($source_image);
        $height = imagesy($source_image);
        $desired_height = floor($height * ($desired_width / $width));
        $virtual_image = imagecreatetruecolor($desired_width, $desired_height);
        $white = imagecolorallocate($virtual_image, 255, 255, 255);
        imagefill($virtual_image, 0, 0, $white);
        imagecopyresampled(
            $virtual_image,
            $source_image,
            0,
            0,
            0,
            0,
            $desired_width,
            $desired_height,
            $width,
            $height
        );
        imagepng($virtual_image, $path);
    }

    public function get($url)
    {
        $fileName = time() . '.png';
        $path = $this->folder . $fileName;
        $result = url('/api/v1' . $path);
        shell_exec(str_replace(
            ['%url', '%file'],
            [$url, storage_path('app') . $path],
            env('LINK_PREVIEW_SCREENSHOT')
        ));
        $this->resize(
            storage_path('app') . $path,
            env('LINK_PREVIEW_SCREENSHOT_WIDTH')
        );
        return $result;
    }
}