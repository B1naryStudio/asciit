<?php

namespace App\Http\Controllers\Mockups;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;

class HeaderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function menu()
    {
        return view('menu-mockup');
    }

    public function config()
    {
        return Response::json([
            'loginserver' => env('AUTH_REDIRECT'),
            'notificationserver' => url('app'),
            'userprofileserver' => url('profile')
        ]);
    }
}
