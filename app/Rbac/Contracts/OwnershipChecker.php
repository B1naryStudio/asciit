<?php

namespace App\Rbac\Contracts;

interface OwnershipChecker
{
    public function isAnswersOwner(array $params);

    public function isQuestionsOwner(array $params);

    public function isCommentsOwner(array $params);
}