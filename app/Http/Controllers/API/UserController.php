<?php

namespace App\Http\Controllers\API;

use App\Services\Auth\Exceptions\AuthException;
use App\Services\RemoteDataGrabber\Contracts\DataGrabberInterface;
use App\Services\RemoteDataGrabber\Exceptions\RemoteDataGrabberException;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Auth\Contracts\AuthServiceInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\AuthValidatedRequest;
use Illuminate\Support\Facades\Redirect;
use App\Services\Auth\Exceptions\TokenInCookieExpiredException;
use Illuminate\Pagination\Paginator;

class UserController extends Controller
{
    private $authService;

    public function __construct(AuthServiceInterface $authService) {
        $this->authService = $authService;

        $this->middleware('auth', ['only' => ['logout']]);
        $this->middleware('rbac', ['only' => ['index', 'update']]);
    }

    public function index(Request $request)
    {
        $pageSize = $request->get('page_size');

        try {
            $users = $this->authService->getAllUsers($pageSize);
        } catch (AuthException $e) {
            return Response::json([
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ], 404);
        }

        $page = (int) Paginator::resolveCurrentPage();

        if (empty($page)) {
            $page = 1;
        }

        if ($page !== $users->currentPage()) {
            return Response::json([
                'error' => 'not found'
            ], 404, [], JSON_NUMERIC_CHECK);
        }

        return Response::json(
            [
                [
                    'total_entries' => $users->total(),
                    'currentPage' => $users->currentPage()
                ],
                $users->items()
            ], 200, [], JSON_NUMERIC_CHECK
        );

    }

    public function update(Request $request, $user_id)
    {
        // Update user
        try {
            $user = $this->authService->updateUser($request->all(), $user_id);
        } catch (AuthException $e) {
            return Response::json([
                'error' => [$e->getMessage()]
            ], 500);
        }

        // Update role
        if (
            $request->has('local_role_id') &&
            Auth::user()->allowed('users.edit.role')
        ) {
            try {
                $user = $this->authService->updateUserRole(
                    $request->input('local_role_id'),
                    $user
                );
            } catch (AuthException $e) {
                return Response::json([
                    'error' => [$e->getMessage()]
                ], 500);
            }
        }

        return Response::json($user, 200, [], JSON_NUMERIC_CHECK);
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

    public function logout(
        Request $request,
        DataGrabberInterface $dataGrabber,
        $id
    ) {
        $cookie = $request->cookie('x-access-token');

        try {
            $this->authService->logout();

            $logoutResult = (array)$dataGrabber->getFromJson(
                url(env('AUTH_LOGOUT')),
                [CURLOPT_COOKIE => 'x-access-token=' . $cookie]
            );
        } catch (AuthException $e) {
            $message = 'Internal logout error: ' . $e->getMessage();

            return Response::json([
                'error' => [$message]
            ], 500);
        } catch (RemoteDataGrabberException $e) {
            $message = 'Remote logout error: ' . $e->getMessage();

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
            } catch (AuthException $e) {
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