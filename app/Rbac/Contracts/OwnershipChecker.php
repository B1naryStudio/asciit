<?php

namespace App\Rbac\Contracts;

interface OwnershipChecker
{
    public function isSelf($params);
    public function isAnswersOwner($params);
    public function isQuestionsOwner($params);
    public function isCommentsOwner($params);
}