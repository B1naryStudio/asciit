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
    
    public function logout($id)
    {
        try {
            $this->authService->logout();
        } catch (AuthException $e){
            return Response::json([
                'error' => [$e->getMessage()]
            ], 500);
        }
        return Response::json(null, 200, [], JSON_NUMERIC_CHECK);
    }

    public function session(Request $request)
    {

        if(!empty($request->cookie('x-access-token'))) {
            $this->authService->getUserFromCookie($request->cookie('x-access-token'));
//            dd($test);
        } else {
            return Redirect::to(env('AUTH_REDIRECT'));
        }

//        try {
//            $user = $this->authService->getUser();
//        } catch (AuthException $e){
//            return Response::json([
//                'error' => [$e->getMessage()]
//            ], 401);
//        }
//
//        return Response::json($user, 200, [], JSON_NUMERIC_CHECK);
    }
}
