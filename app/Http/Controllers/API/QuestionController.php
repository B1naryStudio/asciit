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
use Illuminate\Pagination\Paginator;

class QuestionController extends Controller
{
    /**
     * @var QuestionServiceInterface
     */
    private $questionService;

    public function __construct(QuestionServiceInterface $questionService) {
        $this->questionService = $questionService;

        $this->middleware('auth');
        $this->middleware('rbac');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $folder = $request->get('folder');
        $search = $request->get('search');
        $tag = $request->get('tag');

        /** @var \Illuminate\Pagination\LengthAwarePaginator $questions */

        if (empty($search) && empty($folder) && !empty($tag)) {
            $questions = $this->questionService->getQuestions(
                $request->get('page_size'),
                ['tag' => $tag]
            );
        } elseif (empty($search) && empty($tag) && !empty($folder)) {
            $questions = $this->questionService->getQuestions(
                $request->get('page_size'),
                ['folder' => $folder]
            );
        } else {
            $questions = $this->questionService->getQuestions(
                $request->get('page_size')
            );
        }

        $page = (int) Paginator::resolveCurrentPage();
        if (empty($page)) {
            $page = 1;
        }
        if ($page !== $questions->currentPage()) {
            return Response::json([
                'error' => 'not found'
            ], 404, [], JSON_NUMERIC_CHECK);
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

    public function update(QuestionValidatedRequest $request, $question_id)
    {
        try {
            $updatedQuestion = $this->questionService
                ->updateQuestion($request->all(), $question_id);
        } catch (QuestionServiceException $e) {
            return Response::json([
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ], 404);
        }

        return Response::json(
            $updatedQuestion->toArray(),
            202,
            [],
            JSON_NUMERIC_CHECK
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_or_slug
     * @return Response
     */
    public function show($id_or_slug)
    {
        try {
            $question = $this->questionService->getQuestionBySlug($id_or_slug);
        } catch (QuestionServiceException $e) {
            if (is_numeric($id_or_slug)) {
                try {
                    $question = $this->questionService
                        ->getQuestionById($id_or_slug);
                } catch (QuestionServiceException $e) {
                    return Response::json(['error' => $e->getMessage()], 404);
                }
            } else {
                return Response::json(['error' => $e->getMessage()], 404);
            }
        }

        return Response::json($question->toArray(), 200, [], JSON_NUMERIC_CHECK);
    }

    public function my(Request $request)
    {
        try {
            /** @var \Illuminate\Pagination\LengthAwarePaginator $questions */
            $questions = $this->questionService
                ->getQuestionsByUser($request->get('page_size'));
        } catch (QuestionServiceException $e) {
            return Response::json(['error' => $e->getMessage()], 404);
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

    public function destroy($id) {
        try {
            $question = $this->questionService->removeQuestion($id);
        } catch (QuestionServiceException $e) {
            return Response::json(['error' => $e->getMessage()], 404);
        }

        return Response::json([$question], 200);
    }
}
