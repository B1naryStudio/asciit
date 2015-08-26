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
        $type = $request->get('type');
        if (empty($type)) {
            $type = 'list';
        }

        switch ($type) {
            case 'popular':
                $tags = $this->questionService->getTagsPopular(
                    $request->get('page_size')
                );
                $result = $tags->items();
                break;
            case 'search':
                $result = $this->questionService->getTags(
                    $request->get('page_size')
                );
                break;
            case 'list':
                $tags = $this->questionService->getTagsPopular(
                    $request->get('page_size'),
                    $request->get('search')
                );
                $result = [
                    [
                        'total_entries' => $tags->total(),
                        'currentPage' => $tags->currentPage()
                    ],
                    $tags->items()
                ];
                break;
            default:
                $result = [];
        }

        return Response::json($result, 200, [], JSON_NUMERIC_CHECK);
    }
}
