<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use App\Services\Questions\Exceptions\QuestionServiceException;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\QuestionValidatedRequest;

class QuestionController extends Controller
{
    /**
     * @var QuestionServiceInterface
     */
    private $questionService;

    public function __construct(QuestionServiceInterface $questionService) {
        $this->questionService = $questionService;

        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $tag = $request->get('tag');

        if (empty($search) && !empty($tag)) {
            /** @var \Illuminate\Pagination\LengthAwarePaginator $questions */
            $questions = $this->questionService->getQuestions($request->get('page_size'), ['tag' => $tag]);
        } else {
            /** @var \Illuminate\Pagination\LengthAwarePaginator $questions */
            $questions = $this->questionService->getQuestions($request->get('page_size'));
        }

        return Response::json(
            [
                [
                    'total_entries' => $questions->total(),
                    'currentPage' => $questions->currentPage()
                ],
                $questions->items()
            ], 200, [], JSON_NUMERIC_CHECK
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(QuestionValidatedRequest $request)
    {
        $data = $request->all();

        try {
            $data['user_id'] = Auth::user()->id;
            $question = $this->questionService->createQuestion($data);
        } catch (QuestionServiceException $e) {
            return Response::json([
                'all' => $e->getMessage(),
            ], 400);
        }

        return Response::json($question->toArray(), 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        try {
            $question = $this->questionService->getQuestion($id);
        } catch (QuestionServiceException $e) {
            return Response::json(['error' => $e->getMessage()], 404);
        }

        return Response::json($question->toArray(), 200, [], JSON_NUMERIC_CHECK);
    }
}
