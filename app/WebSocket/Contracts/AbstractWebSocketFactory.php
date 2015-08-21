<?php
/**
 * Created by PhpStorm.
 * User: antarus66
 * Date: 8/18/15
 * Time: 11:16 AM
 */

namespace App\WebSocket\Contracts;


interface AbstractWebSocketFactory {
    public function getWampServer();
    public function getDeliveryService();
}