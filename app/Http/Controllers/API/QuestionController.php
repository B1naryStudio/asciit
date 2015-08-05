<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\QuestionService\Contracts\QuestionServiceInterface;
use App\Exceptions\QuestionServiceException;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    /**
     * @var QuestionServiceInterface
     */
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
    public function index(Request $request)
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
        if (!Auth::check()) {
            return Response::json([
                'all' => 'Unauthorized'
            ], 401);
        }

        $rules = array(
            'title' => 'required|regex:/^([A-Za-zА-Яа-я0-9\s]+)$/|max:400',
            'description' => 'required|max:2048'
        );

        $data = $request->all();
        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            return Response::json($validator->getMessageBag(), 400);
        } else {
            try {
                $data['user_id'] = Auth::user()->id;
                $question = $this->questionService->createQuestion($data);
            } catch (QuestionServiceException $e) {
                return Response::json([
                    'all' => $e->getMessage(),
                ], 400);
            }
            return Response::json($question->toArray(), 200);
        }
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
