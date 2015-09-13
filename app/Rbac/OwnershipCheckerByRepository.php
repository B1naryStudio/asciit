<?php

namespace App\Rbac;

use Illuminate\Support\Facades\Auth;
use App\Rbac\Contracts\OwnershipChecker;

class OwnershipCheckerByRepository implements OwnershipChecker
{
    public function isOwner($params, $idParamName, $repo_name)
    {
        $item_id = $params[$idParamName];
        $repository = app($repo_name);
        $answer = $repository->find($item_id);

        $owner = $answer->user_id;
        $current_user = Auth::id();

        return $owner == $current_user;
    }

    public function isAnswersOwner($params)
    {
        return $this->isOwner(
            $params,
            'answers',
            'App\Repositories\Contracts\AnswerRepository'
        );
    }

    public function isQuestionsOwner($params)
    {
        return $this->isOwner(
            $params,
            'questions',
            'App\Repositories\Contracts\QuestionRepository'
        );
    }

    public function isCommentsOwner($params)
    {
        return $this->isOwner(
            $params,
            'comments',
            'App\Repositories\Contracts\CommentRepository'
        );
    }
}