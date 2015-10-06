<?php

namespace App\Services\Image\Contracts;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface ImageServiceInterface
{
    public function save(UploadedFile $file);

    public function get($filename);

    public function url($filename);

    public function generateFilename($extension, $extraName = '');

    public function resize($file, $new_name, $width);

    public function delete($filename, $isLocal = false);
}