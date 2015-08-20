<?php

namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\FolderValidatedRequest;

class FolderController extends Controller
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
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $folders = $this->questionService->getFolders();

        return Response::json($folders, 200, [], JSON_NUMERIC_CHECK);
    }

    public function destroy($id)
    {
        try {
            $this->questionService->removeFolder($id);
        } catch (QuestionServiceException $e) {
            return Response::json(['all' => $e->getMessage()], 500);
        }

        return Response::json([], 200, [], JSON_NUMERIC_CHECK);
    }

    public function store(FolderValidatedRequest $request)
    {
        try {
            $folder = $this->questionService->createFolder($request->all());
        } catch (QuestionServiceException $e) {
            return Response::json([
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ], 404);
        }

        return Response::json($folder->toArray(), 201);
    }

    public function update(FolderValidatedRequest $request, $id)
    {
        try {
            $folder = $this->questionService->updateFolder($request->all(), $id);
        } catch (QuestionServiceException $e) {
            return Response::json([
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ], 404);
        }

        return Response::json($folder->toArray(), 201);
    }
}
