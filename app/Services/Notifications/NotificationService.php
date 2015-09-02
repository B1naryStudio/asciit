<?php

namespace App\Services\Notifications;

use App\Services\Notifications\Contracts\NotificationServiceInterface;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;

class NotificationService implements NotificationServiceInterface
{
    public function send($data){
        $notificationInfo = [
            'title'       => $data['title'],
            'text'        => $data['text'],
            'url'         => $data['url'],
            'sound'       => true,
            'serviceType' => 'QA platform',
            'users'       => $data['users'],
        ];
        $notificationInfo = json_encode($notificationInfo);
        $cookie = Cookie::get('x-access-token');

        $ch = curl_init();

        $options = [
            CURLOPT_URL            =>  url(env('NOTIFICATIONS')),
            CURLOPT_POSTFIELDS     => $notificationInfo,
            CURLOPT_HEADER         => true,
            CURLOPT_POST           => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_COOKIE         => "x-access-token=" . $cookie,
            CURLOPT_HTTPHEADER     => [
                'Content-type: application/json',
                'Content-Length: ' . strlen($notificationInfo)
            ],
        ];
        curl_setopt_array ($ch , $options);

        $result = curl_exec($ch);
        $http_status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close ($ch);

        if (empty($result))  {
            Log::error("Notification request does not receive any responce. \n"
                . 'Curl options: ' . $options);
        } elseif ($http_status_code != 200) {
            $info = 'Notification '
                . $notificationInfo
                . ' took a responce with code '
                . $http_status_code
                . ".\n Result: "
                . $result;

            Log::error($info);
        }
    }
}