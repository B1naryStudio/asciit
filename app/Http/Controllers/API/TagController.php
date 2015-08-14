<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use Illuminate\Support\Facades\Response;

class TagController extends Controller
{
    /**
     * @var QuestionServiceInterface
     */
    private $questionService;

    public function __construct(QuestionServiceInterface $questionService) {
        $this->questionService = $questionService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $is_popular = $request->get('type') === 'popular';
        if (!empty($is_popular)) {
            $tags = $this->questionService->getTagsPopular($request->get('page_size'));
        } else {
            $tags = $this->questionService->getTags($request->get('page_size'));
        }

        return Response::json($tags, 200, [], JSON_NUMERIC_CHECK);
    }
}
