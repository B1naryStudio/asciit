<?php

namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\QuestionService\Contracts\QuestionServiceInterface;
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
    public function index()
    {
        $folders = $this->questionService->getFolders();

        return Response::json($folders, 200);
    }
}
