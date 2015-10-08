<?php

namespace App\Services\Image\Contracts;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Illuminate\Support\Facades\Response;

interface ImageServiceInterface
{
    /**
     * @param UploadedFile $file
     * @return string
     */
    public function save(UploadedFile $file);

    /**
     * @param string $filename
     * @return Response
     */
    public function get($filename);

    /**
     * @param string $filename
     * @return string mixed
     */
    public function url($filename);

    /**
     * @param $extension
     * @param string $extraName
     * @return array
     *      'filename' => ...
     *      'path' => ...
     *      'local_path' => ...
     *      'url' => ...
     */
    public function generateFilename($extension, $extraName = '');

    /**
     * @param string $file
     * @param string $new_name
     * @param int $width
     */
    public function resize($file, $new_name, $width);

    /**
     * @param string $filename
     * @param bool|false $isLocal
     */
    public function delete($filename, $isLocal = false);
}