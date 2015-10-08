<?php

namespace App\Rbac;

use Illuminate\Support\Facades\Auth;
use App\Rbac\Contracts\OwnershipChecker;

class OwnershipCheckerByRepository implements OwnershipChecker
{
    private function isOwner(array $params, $idParamName, $repo_name)
    {
        $item_id = $params[$idParamName];
        $repository = app($repo_name);
        $item = $repository->find($item_id);

        $owner = $item->user_id;
        $current_user = Auth::id();

        return $owner == $current_user;
    }

    public function isAnswersOwner(array $params)
    {
        return $this->isOwner(
            $params,
            'answers',
            'App\Repositories\Contracts\AnswerRepository'
        );
    }

    public function isQuestionsOwner(array $params)
    {
        return $this->isOwner(
            $params,
            'questions',
            'App\Repositories\Contracts\QuestionRepository'
        );
    }

    public function isCommentsOwner(array $params)
    {
        return $this->isOwner(
            $params,
            'comments',
            'App\Repositories\Contracts\CommentRepository'
        );
    }
}