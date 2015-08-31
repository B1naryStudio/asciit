<?php

namespace App\Http\Controllers\API\Question;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\AnswerValidatedRequest;
use App\Services\Questions\Exceptions\QuestionServiceException;

class AnswerController extends Controller
{
    private $questionService;

    public function __construct(QuestionServiceInterface $questionService)
    {
        $this->questionService = $questionService;

        $this->middleware('auth');
        $this->middleware('rbac');
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($question_id)
    {
        try {
            $answers = $this->questionService
                ->getAnswersOfQuestion($question_id)
                ->toArray();
        } catch (QuestionServiceException $e) {
            $answers = [];
        }
        return Response::json($answers, 201, [], JSON_NUMERIC_CHECK);
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
            $answer = $this->questionService
                ->createAnswer($request->all(), $question_id);
        } catch (QuestionServiceException $e) {
            return Response::json([
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ], 404);
        }

        return Response::json($answer->toArray(), 201, [], JSON_NUMERIC_CHECK);
    }

    public function my(Request $request)
    {
        try {
            $answers = $this->questionService
                ->getAnswersByUser($request->get('page_size'));
        } catch (QuestionServiceException $e) {
            return Response::json(['error' => $e->getMessage()], 404);
        }

        return Response::json(
            [
                [
                    'total_entries' => $answers->total(),
                    'currentPage' => $answers->currentPage()
                ],
                $answers->items()
            ], 200, [], JSON_NUMERIC_CHECK
        );
    }
}
