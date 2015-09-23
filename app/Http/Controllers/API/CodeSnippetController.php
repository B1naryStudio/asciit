<?php

namespace App\Http\Controllers\API;

use App\Services\RemoteDataGrabber\Contracts\DataGrabber;
use App\Services\RemoteDataGrabber\Exceptions\RemoteDataGrabberException;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class CodeSnippetController extends Controller
{
    /**
     * Returns a view for a frame with the GitHub Gist widget
     *
     * @return Response
     */
    public function getGistWidget(Request $request, DataGrabber $grabber)
    {
        // Getting a prefix and jsPath
        $prefix = env('SERVER_PREFIX', '');
        $jsPath = url(($prefix ? '/' : '' ) . env('JS_PATH'));

        if ($prefix) {
            $prefixToPaste = $prefix . '/';
        } else {
            $prefixToPaste = '';
        }

        // Validating the input
        $validator = Validator::make(['link' => $request->get('link')], [
            'link' => [
                'required',
                'regex:/(ftp|http|https):\/\/gist.github.com\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i'
            ]
        ]);

        if ($validator->fails()) {
            return Response::view('errors.gist.404', [
                'js_path'  => $jsPath,
                'prefix'  => $prefixToPaste,
                'description' => 'Incorrect Gist path'
            ],  404);
        }

        // Trying to get a data from remote server
        $link = $request->get('link') . '.json';

        try {
            $data = $grabber->getFromJson($link);
        } catch (RemoteDataGrabberException $e) {
            return Response::view('errors.gist.404', [
                'js_path'  => $jsPath,
                'prefix'  => $prefixToPaste,
                'description' => 'GitHub Gist is not found'
            ],  404);
        }

        // Successfull answer with gist
        return Response::view('widgets.gist', [
            'stylesheet_link' => $data->stylesheet,
            'snippet'         => $data->div,
            'js_path' => $jsPath,
        ], 200);
    }
}
