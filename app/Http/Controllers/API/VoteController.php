<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use Illuminate\Support\Facades\Response;
use App\Services\Questions\Exceptions\QuestionServiceException;

class VoteController extends Controller
{
    /**
     * @var QuestionServiceInterface
     */
    private $questionService;

    public function __construct(QuestionServiceInterface $questionService)
    {
        $this->questionService = $questionService;

        $this->middleware('auth');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        try {
            $vote = $this->questionService->addVote($data);
        } catch (QuestionServiceException $e) {
            return Response::json(['error' => $e->getMessage()], 406);
        }

        return Response::json($vote->toArray(), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        try {
            $removed = $this->questionService->removeVote($id);
        } catch (QuestionServiceException $e) {
            return Response::json(['error' => $e->getMessage()], 406);
        }

        return Response::json($removed, 200);
    }
}
