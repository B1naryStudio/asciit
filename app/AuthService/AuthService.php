<?php

namespace App\AuthService;

use App\AuthService\Contracts\AuthServiceInterface;
use App\AuthService\Exceptions\AuthException;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;

class AuthService implements AuthServiceInterface
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $email;
    protected $password;

    public function __construct()
    {
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

    public function checkUser()
    {
        if(Auth::check()) {
            return Auth::user();
        }
        else {
            return 'not found';
//            return Response::json(['error' => 'Not found'], 404);
        }
    }
}