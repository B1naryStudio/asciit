<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Services\Questions\Contracts\QuestionServiceInterface;

class PreviewController extends Controller
{
    private $configFile = '../.oembed-providers';

    public function __construct (QuestionServiceInterface $questionService)
    {
        $this->middleware('auth');
        $this->middleware('rbac');
    }

    private function loadOEmbedProviders()
    {
        $providers = [];
        $handle = fopen($this->configFile, 'r');
        while (!feof($handle)) {
            $tmp = fgets($handle);
            $server_value = explode('=', str_replace("\n", '', $tmp));
            if (!empty($server_value[1])) {
                $providers[$server_value[0]] = $server_value[1];
            }
        }
        fclose($handle);

        return $providers;
    }

    private function openGraphPreview ($url)
    {
        $curl = curl_init();
        curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl,CURLOPT_URL, $url);
        $result = curl_exec($curl);
        curl_close($curl);
        // check only head
        $result = substr($result, 0, strpos($result, '</head>'));
        // check <meta property="og:image" content="...">
        $r = preg_replace(
            "/(.*)meta\\s*property=\"og:image\"\\s*content=\"(.+?)\"(.*)/s",
            '$2',
            $result
        );
        if (strlen($r) === strlen($result)) {
            // check <meta content="..." property="og:image">
            $r = preg_replace(
                "/(.*)meta\\s*content=\"(.+?)\"\\s*property=\"og:image\"(.*)/s",
                '$2',
                $result
            );
        }
        return strlen($r) !== strlen($result) ? $r : '';
    }

    private function oembedPreview ($url)
    {
        $url_info = parse_url($url);
        $providers = $this->loadOEmbedProviders();

        $result = '';
        if (!empty($providers[$url_info['host']])) {
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt(
                $curl,
                CURLOPT_URL, 'http://' . $url_info['host'] . '/' .
                $providers[$url_info['host']] . '?url=' .
                urlencode($url) .'&format=json'
            );
            curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);
            $result = curl_exec($curl);
            curl_close($curl);
            if ($result) {
                $result = @json_decode($result);
            }
        }


        return $result && $result->thumbnail_url ? $result->thumbnail_url : '';
    }

    public function index (Request $request)
    {
        $url = $this->oembedPreview($request->query->get('url'));
        if (empty($url)) {
            $url = $this->openGraphPreview($request->query->get('url'));
        }
        if (empty($url)) {
            $url = env('LINK_PREVIEW_DEFAULT');
        }
        return Response::json([
            'url' => $url
        ], 200);
    }
}
