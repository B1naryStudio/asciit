<?php

namespace App\Services\RemoteDataGrabber;

use App\Services\RemoteDataGrabber\Contracts\DataGrabber;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CurlDataGrabber implements DataGrabber
{
    public function getRaw($link, $curlOptions = [])
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            $link);
        curl_setopt($ch, CURLOPT_HEADER,         1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FAILONERROR,    1);
        curl_setopt($ch, CURLOPT_TIMEOUT,        30);

        foreach ($curlOptions as $option => $value) {
            curl_setopt($ch, $option,  $value);
        }

        $response = curl_exec($ch);
        $errno = curl_errno($ch);
        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $resultBody = substr($response, $header_size );

        if ($errno) {
            $errorMessage = curl_strerror($errno);
            $exeptionMessage = "cURL error ({$errno}):\n {$errorMessage}";
            throw new \RuntimeException($exeptionMessage);
        } else if (curl_error($ch) !== "") {
            throw new \RuntimeException('Cannot get an information');
        }

        return $resultBody;
    }

    public function getFromJson($link, $curlOptions = [])
    {
        $resultBody = $this->getRaw($link, $curlOptions);
        return json_decode($resultBody);
    }
}