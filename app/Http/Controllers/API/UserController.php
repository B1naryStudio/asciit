<?php

namespace App\Http\Controllers\API;

use App\Services\Auth\Exceptions\AuthException;
use App\Services\RemoteDataGrabber\Contracts\DataGrabber;
use App\Services\RemoteDataGrabber\Exceptions\RemoteDataGrabberException;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Auth\Contracts\AuthServiceInterface;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\AuthValidatedRequest;
use Illuminate\Support\Facades\Redirect;
use App\Services\Auth\Exceptions\TokenInCookieExpiredException;

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

    public function logout(Request $request, DataGrabber $dataGrabber, $id)
    {
        $cookie = $request->cookie('x-access-token');

        try {
            $this->authService->logout();

            $logoutResult = (array)$dataGrabber->getFromJson(
                url(env('AUTH_LOGOUT')),
                [CURLOPT_COOKIE => "x-access-token=" . $cookie]
            );
        } catch (AuthException $e){
            $message = "Internal logout error: " . $e->getMessage();

            return Response::json([
                'error' => [$message]
            ], 500);
        } catch (RemoteDataGrabberException $e) {
            $message = "Remote logout error: " . $e->getMessage();

            return Response::json([
                'error' => [$message]
            ], 500);
        }

        setcookie('x-access-token', '', -1, '/');
        return Response::json($logoutResult, 200, null, JSON_NUMERIC_CHECK);
    }

    public function session(Request $request)
    {
        $cookie = $request->cookie('x-access-token');
        if(!empty($cookie)) {
            try {
                $user = $this->authService->getUserFromCookie(
                    $request->cookie('x-access-token')
                );
            } catch (TokenInCookieExpiredException $e) {
                return Redirect::to(env('AUTH_REDIRECT'))
                               ->withCookie(
                                   'referer',
                                   url(env('SERVER_PREFIX', '') . '/')
                               );
            } catch (AuthException $e){
                // Redirect to the authorisation server if user is not authorised
                return Response::json(
                    ['redirectTo' => url(env('AUTH_REDIRECT'))],
                    302
                )->withCookie('referer', url(env('SERVER_PREFIX', '') . '/'));
            }
        } else {
            return Response::json(
                ['redirectTo' => url(env('AUTH_REDIRECT'))],
                302
            )->withCookie('referer', url(env('SERVER_PREFIX', '') . '/'));
        }

        return Response::json($user, 200, [], JSON_NUMERIC_CHECK);
    }
}