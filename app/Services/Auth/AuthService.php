<?php

namespace App\Services\Auth;

use App\Services\Auth\Contracts\AuthServiceInterface;
use App\Services\Auth\Exceptions\AuthException;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
use App\Repositories\Contracts\UserRepository;

class AuthService implements AuthServiceInterface
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $email;
    protected $password;
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function authenticate($data)
    {
        if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            return $this->userRepository->findWithRelations(
                Auth::id(),
                ['roles']
            );
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
            return $this->userRepository->findWithRelations(
                Auth::id(),
                ['roles']
            );
        } else {
            throw new AuthException('User is not authorized');
        }
    }
}