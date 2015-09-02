<?php

namespace App\Services\Notifications\Contracts;

interface NotificationServiceInterface
{
    public function send($data);
}