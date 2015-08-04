<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\QuestionService\Contracts\QuestionServiceInterface;
use App\Exceptions\QuestionServiceException;
use Illuminate\Support\Facades\Response;

class QuestionController extends Controller
{
    private $questionService;

    public function __construct(QuestionServiceInterface $questionService) {
        $this->questionService = $questionService;

//        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $questions = $this->questionService->getQuestions();
        return Response::json($questions, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
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
            return Response::json([
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ], 404);
        }

        return Response::json($question->toArray(), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
