<?php

namespace App\Http\Controllers\Api\Question;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\CommentValidatedRequest;
use App\Services\Questions\Exceptions\QuestionServiceException;

class CommentController extends Controller
{

    private $questionService;

    public function __construct(QuestionServiceInterface $questionService)
    {
        $this->questionService = $questionService;

        $this->middleware('auth');
        $this->middleware('rbac');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(CommentValidatedRequest $request, $question_id)
    {
        try {
            $comment = $this->questionService->createComment($request->all(), $question_id);
        } catch (QuestionServiceException $e) {
            return Response::json([
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ], 404);
        }

        return Response::json($comment->toArray(), 201);
    }

    public function destroy($entry_id, $comment_id) {
        try {
            $this->questionService->removeComment($comment_id);
        } catch (QuestionServiceException $e) {
            return Response::json(['error' => $e->getMessage()], 404);
        }

        return Response::json([], 200);
    }
}
