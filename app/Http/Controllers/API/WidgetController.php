<?php

namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Questions\Contracts\QuestionServiceInterface;
use Illuminate\Database\Eloquent\Collection;
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
        $where = [];
        $date = $request->get('date_start');
        if (!empty($date)) {
            $where['date_start'] = $date;
        }
        $date = $request->get('date_end');
        if (!empty($date)) {
            $where['date_end'] = $date;
        }

        /** @var \Illuminate\Pagination\LengthAwarePaginator $questions */
        $questions = $this->questionService->getQuestions($count, $where);

        $questions = $this->addLinks($request, $questions);

        return Response::json($questions->items(), 200);
    }

    /**
     * Display a listing of the popular questions.
     *
     * @return Response
     */
    public function questionsPopular(Request $request)
    {
        $count = $request->get('count');
        if (empty($count)) {
            $count = 3;
        }
        $where = [];
        $date = $request->get('date_start');
        if (!empty($date)) {
            $where['date_start'] = $date;
        }
        $date = $request->get('date_end');
        if (!empty($date)) {
            $where['date_end'] = $date;
        }

        /** @var \Illuminate\Pagination\LengthAwarePaginator $questions */
        $questions = $this->questionService->getQuestionsPopular($count, $where);

        $questions = $this->addLinks($request, $questions);

        return Response::json($questions, 200);
    }

    /**
     * Display a listing of the upvoted questions.
     *
     * @return Response
     */
    public function questionsUpvoted(Request $request)
    {
        $count = $request->get('count');
        if (empty($count)) {
            $count = 3;
        }
        $where = [];
        $date = $request->get('date_start');
        if (!empty($date)) {
            $where['date_start'] = $date;
        }
        $date = $request->get('date_end');
        if (!empty($date)) {
            $where['date_end'] = $date;
        }

        /** @var \Illuminate\Pagination\LengthAwarePaginator $questions */
        $questions = $this->questionService->getQuestionsUpvoted($count, $where);

        $questions = $this->addLinks($request, $questions);

        return Response::json($questions, 200);
    }

    /**
     * Display a listing of the upvoted questions.
     *
     * @return Response
     */
    public function questionsCommented(Request $request)
    {
        $count = $request->get('count');
        if (empty($count)) {
            $count = 3;
        }
        $where = [];
        $date = $request->get('date_start');
        if (!empty($date)) {
            $where['date_start'] = $date;
        }
        $date = $request->get('date_end');
        if (!empty($date)) {
            $where['date_end'] = $date;
        }

        /** @var \Illuminate\Pagination\LengthAwarePaginator $questions */
        $questions = $this->questionService->getQuestionsTopCommented($count, $where);

        $questions = $this->addLinks($request, $questions);

        return Response::json($questions, 200);
    }

    private function addLinks(Request $request, $data)
    {
        if ($data instanceof Collection) {
            $data = $data->items();
        }

        foreach ($data as &$item) {
            $item->url = url(env('SERVER_PREFIX', '') . '/' . '#questions/' . $item->slug );
        }
        unset($item);

        return $data;
    }
}