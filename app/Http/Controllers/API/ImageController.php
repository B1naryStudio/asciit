<?php

namespace App\Http\Controllers\API;

use App\Services\Image\Contracts\ImageServiceInterface;
use App\Services\Image\Exceptions\ImageException;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ImageController extends Controller
{
    public function __construct(QuestionServiceInterface $questionService)
    {
        $this->middleware('auth');
        $this->middleware('rbac');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request, ImageServiceInterface $imageService)
    {
        $response_type = $request->get('responseType');
        if (!$request->hasFile('upload')) {
            if ($response_type === 'json') {
                return Response::json([
                    'description' => 'File not exists',
                ], 422);
            }
            throw new UnprocessableEntityHttpException();
        }

        $fileName = $imageService->save($request->file('upload'));
        $url = $imageService->url($fileName);

        if ($response_type === 'json') {
            return Response::json([
                'fileName' => $fileName,
                'uploaded' => 1,
                'url'      => $url
            ], 200, [], JSON_NUMERIC_CHECK);
        }

        // For CKEditor API
        // (http://docs.ckeditor.com/#!/guide/dev_file_browser_api)
        $funcNum = $request->get('CKEditorFuncNum');
        $message = 'Image was loading successfully';

        return "<script type='text/javascript'>
                    window.parent.CKEDITOR.tools.callFunction(
                        $funcNum,
                        '$url',
                        '$message'
                    );
                </script>";
    }

    /**
     * Display the image
     *
     * @param ImageServiceInterface $imageService
     * @param $filename
     * @param $extension
     * @return mixed
     */
    public function show(
        ImageServiceInterface $imageService,
        $filename,
        $extension
    ) {
        try {
            return $imageService->get($filename . '.' . $extension);
        } catch (ImageException $e) {
            throw new NotFoundHttpException();
        }
    }
}
