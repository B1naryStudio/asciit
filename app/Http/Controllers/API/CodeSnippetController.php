<?php

namespace App\Http\Controllers\API;

use App\Services\RemoteDataGrabber\Contracts\DataGrabberInterface;
use App\Services\RemoteDataGrabber\Exceptions\RemoteDataGrabberException;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use DOMDocument;

class CodeSnippetController extends Controller
{
    /**
     * Returns a view for a frame with the GitHub Gist widget
     *
     * @return Response
     */
    public function getGistWidget(
        Request $request,
        DataGrabberInterface $grabber
    )
    {
        // Validating the input
        $validator = Validator::make(['link' => $request->get('link')], [
            'link' => [
                'required',
                'regex:/(ftp|http|https):\/\/gist.github.com\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i'
            ]
        ]);

        if ($validator->fails()) {
            return $this->returnWidgetError('Incorrect Gist path');
        }

        // Trying to get a data from remote server
        $link = $request->get('link') . '.json';

        try {
            $data = $grabber->getFromJson($link);
        } catch (RemoteDataGrabberException $e) {
            return $this->returnWidgetError('GitHub Gist is not found');
        }

        // Successfull answer with gist
        return Response::view('widgets.gist', [
            'stylesheet_link' => $data->stylesheet,
            'snippet'         => $data->div,
            'js_path'         => $this->getJsPath(),
        ], 200);
    }

    public function getPastebinWidget(Request $request, DataGrabber $grabber)
    {
        $link = $request->get('link');

        // Validating the input
        $validator = Validator::make(['link' => $link], [
            'link' => [
                'required',
                'regex:/(ftp|http|https):\/\/pastebin.com\/embed_iframe.php\?i=[a-z0-9]+/i'
            ]
        ]);

        if ($validator->fails()) {
            return $this->returnWidgetError('Incorrect Pastebin path');
        }

        try {
            $data = $grabber->getRaw($link);
        } catch (RemoteDataGrabberException $e) {
            return $this->returnWidgetError('Pastebin snippet is not found');
        }

        // Attaching a script for resize
        $doc = new DOMDocument('1.0');
        $doc->loadHTML($data);
        $body = $doc->getElementsByTagName('body')[0];

        $script = $doc->createElement ( 'script', '' );
        $scriptUrl = url(
            $this->getJsPath()
                . '/vendor/jquery/iframeResizer.contentWindow.min.js'
        );
        $script->setAttribute ('src', $scriptUrl);
        $body->appendChild ( $script );

        $htmlData = $doc->saveHTML();


        return Response::make($htmlData, 200);
    }

    protected function returnWidgetError($message)
    {
        // Getting a prefix and jsPath
        $prefix = env('SERVER_PREFIX', '');
        $jsPath = url(($prefix ? '/' : '' ) . env('JS_PATH'));

        if ($prefix) {
            $prefixToPaste = $prefix . '/';
        } else {
            $prefixToPaste = '';
        }

        return Response::view('errors.gist.404', [
            'js_path'  => $jsPath,
            'prefix'  => $prefixToPaste,
            'description' => $message
        ],  404);
    }

    protected function getJsPath()
    {
        $prefix = env('SERVER_PREFIX', '');
        $jsPath = url(($prefix ? '/' : '' ) . env('JS_PATH'));

        return $jsPath;
    }

}