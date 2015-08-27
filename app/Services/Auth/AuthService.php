<?php

namespace App\Services\Auth;

use App\Services\Auth\Contracts\AuthServiceInterface;
use App\Services\Auth\Exceptions\AuthException;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use App\Repositories\Contracts\UserRepository;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Token;


class AuthService implements AuthServiceInterface
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $email;
    protected $password;
    private $userRepository;

    public function __construct(
        UserRepository $userRepository
    )
    {
        $this->userRepository = $userRepository;
    }

    public function authenticate($data)
    {
        if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            return Auth::user();
        } else {
            return Response::json(['error' => 'Wrong login or password'], 404);
        }
    }
    
    public function logout()
    {
        try {
            Auth::logout();
        } catch(Exception $e) {
            throw new AuthException($e->getMessage(), null, $e);
        }
    }

    public function getUser()
    {
        if (Auth::check()) {
            return Auth::user();
        } else {
            throw new AuthException('User is not authorized');
        }
    }

    public function getUserFromCookie($cookie) {
        $tokenObject = new Token($cookie);
        $payload = JWTAuth::decode($tokenObject);
        $test = $payload->toArray();
        $user = $this->userRepository->firstOrCreate(['remember_token' => $test['id']]);
        if($user->remember->token === null) {
            $user->remember->token = $test['id'];
            $user->email = $test['email'];
            $user->role = $test['role'];
        }
    }


}