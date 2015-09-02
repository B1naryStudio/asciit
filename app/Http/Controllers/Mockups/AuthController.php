<?php

namespace App\Http\Controllers\Mockups;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Illuminate\Support\Facades\Redirect;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function auth(Request $request)
    {
        $customClaims = [
            'id' =>  '55dc13391846c68a1ad56daa',
            'email' =>  'admin@admin',
            'role' => 'ADMIN',
            'iat' => 1440615292
        ];

        $payload = JWTFactory::make($customClaims);
        $data = JWTAuth::encode($payload);
        $redirectPath = $request->cookie('referer');

        return Redirect::to($redirectPath, 303)
            ->withCookie('x-access-token', $data->get())
            ->withCookie('serverUID', '55dc13391846c68a1ad56daa');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function logout()
    {
        setcookie('x-access-token', '', -1, '/');
    }
}
