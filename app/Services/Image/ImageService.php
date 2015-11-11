<?php

namespace App\Services\Image;

use App\Services\Image\Contracts\ImageServiceInterface;
use App\Services\Image\Exceptions\ImageNotWritableException;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\File;
use App\Services\Image\Exceptions\ImageNotFoundHttpException;

class ImageService implements ImageServiceInterface
{
    public function save(UploadedFile $file)
    {
        $info = $this->generateFilename(
            $file->getClientOriginalExtension()
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
            pathinfo($filename, PATHINFO_FILENAME) . '_' .
            pathinfo($filename, PATHINFO_EXTENSION)
        );
    }

    public function get($filename)
    {
        $path = config('images.path') . $filename;

        if (!Storage::exists($path)) {
            throw new ImageNotFoundHttpException();
        }

        $data = Storage::get($path);
        $mime = finfo_buffer(finfo_open(FILEINFO_MIME_TYPE), $data);

        return Response::make($data)
            ->header('Content-Type', $mime)
            ->header('Content-Length', strlen($data));
    }

    public function generateFilename($extension, $extraName = '')
    {
        $fileName = time() . rand() . ($extraName ? ('_' . $extraName) : '');
        $fileName .= '.' . $extension;

        return [
            'filename' => $fileName,
            'path' => config('images.path') . $fileName,
            'local_path' => storage_path('app') . '/' . config('images.path') .
                $fileName,
            'url' => $this->url($fileName)
        ];
    }

    public function resize($file, $newName, $width)
    {
        $image = Image::make($file)
            ->resize($width, null, function ($constraint) {
                $constraint->upsize();
                $constraint->aspectRatio();
            });

        $data = $image->encode(pathinfo($newName, PATHINFO_EXTENSION));

        $saved = Storage::put(
            config('images.path') . $newName,
            $data->getEncoded()
        );

        if ($saved === false) {
            throw new ImageNotWritableException(
                'Can\'t write image data to path ({$path})'
            );
        }
    }

    public function delete($filename, $isLocal = false)
    {
        if ($isLocal) {
            File::delete(
                storage_path('app') . '/' . config('images.path') . $filename
            );
        } else {
            Storage::delete(config('images.path') . $filename);
        }
    }
}