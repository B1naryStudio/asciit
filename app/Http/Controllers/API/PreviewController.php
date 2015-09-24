<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Services\Preview\PreviewService;

class PreviewController extends Controller
{
    /**
     * @var PreviewService
     */
    private $previewService;

    public function __construct(PreviewService $previewService)
    {
        $this->previewService = $previewService;

        $this->middleware('auth');
        $this->middleware('rbac');
    }

    public function index(Request $request)
    {
        return Response::json([
            'url' => $this->previewService->get($request->query->get('url'))
        ], 200);
    }
}
