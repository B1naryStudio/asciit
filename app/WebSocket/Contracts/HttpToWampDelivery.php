<?php
/**
 * Created by PhpStorm.
 * User: antarus66
 * Date: 8/17/15
 * Time: 5:09 PM
 */
namespace App\WebSocket\Contracts;

interface HttpToWampDelivery
{
    public function send($data);
}