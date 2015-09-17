<?php

namespace App\Services\RemoteDataGrabber;

use App\Services\RemoteDataGrabber\Contracts\DataGrabber;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CurlDataGrabber implements DataGrabber
{
    public function getRaw($link)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            $link);
        curl_setopt($ch, CURLOPT_HEADER,         1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FAILONERROR,    1);
        curl_setopt($ch, CURLOPT_TIMEOUT,        30);
        $response = curl_exec($ch);
        $errno = curl_errno($ch);

        if ($errno) {
            $errorMessage = curl_strerror($errno);
            $exeptionMessage = "cURL error ({$errno}):\n {$errorMessage}";
            throw new \RuntimeException($exeptionMessage);
        } else if (curl_error($ch) !== "") {
            throw new \RuntimeException('Cannot get an information');
        }

        $header_size = curl_getinfo($ch,CURLINFO_HEADER_SIZE);
        $resultBody = substr($response, $header_size );

        return $resultBody;
    }

    public function getFromJson($link)
    {
        $resultBody = $this->getRaw($link);
        return json_decode($resultBody);
    }
}