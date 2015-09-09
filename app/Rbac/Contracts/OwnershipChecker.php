<?php

namespace App\Rbac\Contracts;

interface OwnershipChecker
{
    public function isAnswersOwner($params);
    public function isQuestionsOwner($params);
    public function isCommentsOwner($params);
}