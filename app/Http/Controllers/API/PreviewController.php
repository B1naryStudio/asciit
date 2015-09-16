<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Services\Questions\Contracts\QuestionServiceInterface;

class PreviewController extends Controller
{
    public function __construct(QuestionServiceInterface $questionService)
    {
        $this->middleware('auth');
        $this->middleware('rbac');
    }

    public function index(Request $request)
    {
        $curl = curl_init();
        curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl,CURLOPT_URL, $request->query->get('url'));
        $result = curl_exec($curl);
        curl_close($curl);
        $r = preg_replace("/(.*)meta\\sproperty=\"og:image\"\\scontent=\"(.+?)\"(.*)/s", '$2', $result);
        if (strlen($r) !== strlen($result)) {
            $url = $r;
        } else {
            $url = 'http://javascript.ru/forum/images/ca_serenity/misc/logo.gif';
        }
        return Response::json([
            'url' => $url
        ], 200);
    }
}
