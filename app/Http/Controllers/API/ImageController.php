<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ImageController extends Controller
{
    protected $localImagePath = '/images/';

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
    public function store(Request $request)
    {
        $response_type = $request->get('responseType');
        if (!$request->hasFile('upload'))
        {
            if ($response_type === 'json') {
                return Response::json([
                    'description' => 'File not exists',
                ], 422);
            }
            throw new UnprocessableEntityHttpException();
        }

        $image = $request->file('upload');
        $time = time();
        $fileName = $time . '_' . $image->getClientOriginalName();
        $path = $this->localImagePath . $fileName;
        $url = url(
            env('SERVER_PREFIX') . '/api/v1' .
            $this->localImagePath . $time . '_' .
            pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)
        );

        // Saving
        Image::make($image->getRealPath())
            ->resize(600, null, function ($constraint) {
                $constraint->upsize();
                $constraint->aspectRatio();
            })
            ->save(storage_path('app') .  $path);

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
     * Display the specified resource
     *
     * @param Request $request
     * @param $filename string
     * @return mixed
     */
    public function show(Request $request, $filename)
    {
        $path = storage_path('app') . $this->localImagePath . $filename;
        // search only jpg files
        $exists = File::exists($path . '.jpg');

        if (!$exists) {
            if ($request->get('responceType') === 'json') {
                return Response::json([
                    'error' => 'File not exists',
                ], 404);
            }
            throw new NotFoundHttpException();
        }

        //will ensure a jpg is always returned
        return Image::make($path . '.jpg')->response('jpg');
    }
}
