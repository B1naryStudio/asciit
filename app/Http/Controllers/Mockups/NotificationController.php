<?php

namespace App\Http\Controllers\Mockups;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class NotificationController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
//        $cookie = $request->cookie('x-access-token');
//        return response($cookie);
        return response($request->all());
    }
}
