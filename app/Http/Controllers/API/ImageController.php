<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
class ImageController extends Controller
{
    protected $localImagePath = '/images/';

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        if (!$request->hasFile('upload'))
        {
            return Response::json([
                'description' => 'File not exists',
            ], 422);
        }

        $image = $request->file('upload');
        $fileName = time() . '_' . $image->getClientOriginalName();
        $path = $this->localImagePath . $fileName;
        $url = url('/api/v1' . $path);

        // Saving
        Image::make($image->getRealPath())
            ->resize(600, null, function ($constraint) {
                $constraint->upsize();
            })
            ->save(storage_path('app') .  $path);

        $funcNum = $request->get('CKEditorFuncNum');
        $message = 'Image was loading successfully';

        // Callback for CKEditor API (http://docs.ckeditor.com/#!/guide/dev_file_browser_api)
        return "<script type='text/javascript'>
                    window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');
                </script>";


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($filename)
    {
        $path = storage_path('app') . $this->localImagePath . $filename;
        $exists = File::exists($path);

        if(!$exists) {
            return Response::json([
                'error' => 'File not exists',
            ], 422);
        }

        return Image::make($path)->response('jpg'); //will ensure a jpg is always returned
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
