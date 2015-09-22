<?php

namespace App\Services\RemoteDataGrabber;

use App\Services\RemoteDataGrabber\Contracts\DataGrabber;
use App\Services\RemoteDataGrabber\Exceptions\RemoteServerException;
use App\Services\RemoteDataGrabber\Exceptions\JsonDecodingException;
use RuntimeException;

class CurlDataGrabber implements DataGrabber
{
    public function getRaw($link, $curlOptions = [])
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            $link);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FAILONERROR,    1);
        curl_setopt($ch, CURLOPT_TIMEOUT,        30);

        foreach ($curlOptions as $option => $value) {
            curl_setopt($ch, $option,  $value);
        }

        $response = curl_exec($ch);
        $errno = curl_errno($ch);

        if ($errno) {
            $errorMessage = curl_strerror($errno);
            $exeptionMessage = "cURL error ({$errno}):\n {$errorMessage}";
            throw new RemoteServerException($exeptionMessage);
        } else if (curl_error($ch) !== "") {
            throw new RemoteServerException('Cannot get an information');
        }

        return $response;
    }

    public function getFromJson($link, $curlOptions = [])
    {
        $resultBody = $this->getRaw($link, $curlOptions);
        $result = @json_decode($resultBody);

        if ($result === null && json_last_error() !== JSON_ERROR_NONE) {
            throw new JsonDecodingException('Cannot get an information');
        };

        return $result;
    }
}