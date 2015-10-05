<?php

namespace App\Services\Image;

use App\Services\Image\Contracts\ImageServiceInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\File;
use App\Services\Image\Exceptions\ImageNotFoundHttpException;

class ImageService implements ImageServiceInterface
{
    public function save(UploadedFile $file)
    {
        $info = $this->generateFilename(
            $file->getClientOriginalExtension(),
            pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)
        );
        $this->resize(
            $file->getRealPath(),
            $info['filename'],
            config('images.width')
        );
        return $info['filename'];
    }

    /**
     * Create url
     *
     * @param $filename
     * @return string /config.url/filename/extension
     */
    public function url($filename)
    {
        return url(
            config('images.url') .
            pathinfo($filename, PATHINFO_FILENAME) . '/' .
            pathinfo($filename, PATHINFO_EXTENSION)
        );
    }

    public function get($filename)
    {
        $path = storage_path('app') . config('images.localPath') . $filename;
        $exists = File::exists($path);

        if (!$exists) {
            throw new ImageNotFoundHttpException();
        }

        return Image::make($path)->response(pathinfo($path, PATHINFO_EXTENSION));
    }

    public function generateFilename($extension, $extraName = '')
    {
        $fileName = time() . ($extraName ? ('_' . $extraName) : '');
        return [
            'filename' => $fileName . '.' . $extension,
            'path' => config('images.localPath') . $fileName . '.' . $extension,
            'full_path' => storage_path('app') . config('images.localPath') .
                $fileName . '.' . $extension,
            'url' => config('images.url') . $fileName . '/' . $extension
        ];
    }

    public function resize($file, $new_name, $width)
    {
        Image::make($file)
            ->resize($width, null, function ($constraint) {
                $constraint->upsize();
                $constraint->aspectRatio();
            })
            ->save(storage_path('app') . config('images.localPath') . $new_name);
    }
}