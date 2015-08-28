<?php

namespace App\Http\Controllers\API;

use App\Services\Auth\Exceptions\AuthException;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Auth\Contracts\AuthServiceInterface;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\AuthValidatedRequest;

use Illuminate\Support\Facades\Redirect;
use App\Services\Auth\Exceptions\TokenInCookieExpiredException;
use Illuminate\Support\Facades\URL;

class UserController extends Controller
{
    private $authService;

    public function __construct(AuthServiceInterface $authService) {
        $this->authService = $authService;

        $this->middleware('auth', ['only' => ['logout']]);
    }
    
    public function login(AuthValidatedRequest $request)
    {
        try {
            $auth = $this->authService->authenticate($request->all());
        } catch (AuthException $e) {
            return Response::json([
                'error' => [$e->getMessage()]
            ], 500);
        }
        return $auth;

    }
    
    public function logout(Request $request, $id)
    {
        try {
            $this->authService->logout();
        } catch (AuthException $e){
            return Response::json([
                'error' => [$e->getMessage()]
            ], 500);
        }

        $cookie = $request->cookie('x-access-token');
        $this->sendRemoteLogout($cookie);
        setcookie('x-access-token', '', -1, '/');

        return Response::json(null, 200, [], JSON_NUMERIC_CHECK);
    }

    public function session(Request $request)
    {
        $cookie = $request->cookie('x-access-token');
        if(!empty($cookie)) {
            try {
                $user = $this->authService->getUserFromCookie($request->cookie('x-access-token'));
            } catch (TokenInCookieExpiredException $e) {
                /*
                 * Hardcoded url!
                 */
                return Redirect::to('http://team.binary-studio.com/auth/')
                    ->withCookie('referer', 'http://team.binary-studio.com/asciit/');
            } catch (AuthException $e){
                return Response::json([
                    'error' => [$e->getMessage()]
                ], 401);
            }
        } else {
            /*
             * Hardcoded url!
             */
            return Response::json(['redirectTo' => 'http://team.binary-studio.com/auth/'], 302)
                ->withCookie('referer', 'http://team.binary-studio.com/asciit/');
        }

        return Response::json($user, 200, [], JSON_NUMERIC_CHECK);
    }

    public function sendRemoteLogout($cookie) {
        $ch = curl_init();
        /*
         * Hardcoded url!
         */
        curl_setopt($ch, CURLOPT_URL,            'http://team.binary-studio.com/auth/logout');
        curl_setopt($ch, CURLOPT_HEADER,         1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT,        30);
        curl_setopt($ch, CURLOPT_COOKIE,        "x-access-token=".$cookie);
        $response = curl_exec($ch);

        return $response;
    }
}
