<?php

namespace App\Services\Notifications;

use App\Services\Notifications\Contracts\NotificationServiceInterface;

class NotificationService implements NotificationServiceInterface
{
    public function send($data){
        $notificationInfo = array();
        $notificationInfo['title'] = $data['title'];
        $notificationInfo['text'] = $data['text'];
        $notificationInfo['url'] = $data['url'];
        $notificationInfo['images'] = [];
        $notificationInfo['sound'] = true;
        $notificationInfo['serviceType'] = 'QA platform';
        $notificationInfo['users'] = $data['users'];
        $notificationInfo = json_encode($notificationInfo);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            url(env('NOTIFICATIONS')));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $notificationInfo);
        curl_exec($ch);
    }
}