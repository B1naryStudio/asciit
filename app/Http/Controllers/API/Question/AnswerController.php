<?php

namespace App\Http\Controllers\API\Question;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\AnswerValidatedRequest;

class AnswerController extends Controller
{
    private $questionService;

    public function __construct(QuestionServiceInterface $questionService)
    {
        $this->questionService = $questionService;

        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($question_id)
    {
        $answers = $this->questionService->getAnswersOfQuestion($question_id);
        return Response::json($answers->toArray(), 201, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(AnswerValidatedRequest $request, $question_id)
    {
        try {
            $answer = $this->questionService->createAnswer($request->all(), $question_id);
        } catch (QuestionServiceException $e) {
            return Response::json([
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ], 404);
        }

        return Response::json($answer->toArray(), 201, [], JSON_NUMERIC_CHECK);
    }
}
