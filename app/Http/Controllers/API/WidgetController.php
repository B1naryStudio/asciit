<?php

namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class WidgetController extends Controller
{
    /**
     * @var QuestionServiceInterface
     */
    private $questionService;

    public function __construct(QuestionServiceInterface $questionService)
    {
        $this->questionService = $questionService;
    }

    /**
     * Display a listing of the recent questions.
     *
     * @return Response
     */
    public function questionsRecent(Request $request)
    {
        $count = $request->get('count');
        if (empty($count)) {
            $count = 3;
        }
        /** @var \Illuminate\Pagination\LengthAwarePaginator $questions */
        $questions = $this->questionService->getQuestions($count);

        return Response::json($questions->items(), 200);
    }

    /**
     * Display a listing of the recent questions.
     *
     * @return Response
     */
    public function questionsPopular(Request $request)
    {
        $count = $request->get('count');
        if (empty($count)) {
            $count = 3;
        }
        /** @var \Illuminate\Pagination\LengthAwarePaginator $questions */
        $questions = $this->questionService->getQuestionsPopular($count);

        return Response::json($questions, 200);
    }
}