<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Services\Questions\Contracts\QuestionServiceInterface;

class PreviewController extends Controller
{
    public function __construct (QuestionServiceInterface $questionService)
    {
        $this->middleware('auth');
        $this->middleware('rbac');
    }

    private function openGraphPreview ($url)
    {
        $curl = curl_init();
        curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl,CURLOPT_URL, $url);
        $result = curl_exec($curl);
        curl_close($curl);
        $r = preg_replace(
            "/(.*)meta\\s*property=\"og:image\"\\s*content=\"(.+?)\"(.*)/s",
            '$2',
            $result
        );
        return strlen($r) !== strlen($result) ? $r : '';
    }

    public function index (Request $request)
    {
        $url = $this->openGraphPreview($request->query->get('url'));
        if (empty($url)) {
            $url = env('LINK_PREVIEW_DEFAULT');
        }
        return Response::json([
            'url' => $url
        ], 200);
    }
}
