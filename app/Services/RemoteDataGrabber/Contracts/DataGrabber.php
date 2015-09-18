<?php

namespace App\Services\RemoteDataGrabber\Contracts;

interface DataGrabber
{
    public function getRaw($link);
    public function getFromJson($link);
}