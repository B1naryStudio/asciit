<?php

namespace App\Services\Auth;

use App\Services\Auth\Contracts\AuthServiceInterface;
use App\Services\Auth\Exceptions\AuthException;
use App\Services\Auth\Exceptions\TokenInCookieExpiredException;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use App\Repositories\Contracts\UserRepository;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Token;



class AuthService implements AuthServiceInterface
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $email;
    protected $password;
    protected $userRepository;

    public function __construct(
        UserRepository $userRepository
    ) {
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

    public function getUserFromCookie($cookie) {
        $tokenObject = new Token($cookie);
        try {
            $payload = JWTAuth::decode($tokenObject);
        } catch (TokenExpiredException $e) {
            throw new TokenInCookieExpiredException(
                'Token in cookie was expired',
                null,
                $e
            );
        }

        $userInfo = $payload->toArray();
        $user = $this->userRepository->firstOrCreate(['email' => $userInfo['email']]);
        $remoteInfo = (array)$this->getRemoteUserInfo($cookie);

        if (array_key_exists('name', $remoteInfo)) {
            $remoteInfo['first_name'] = $remoteInfo['name'];
        }

        if (array_key_exists('surname', $remoteInfo)) {
            $remoteInfo['last_name'] = $remoteInfo['name'];
        }

        $user = $this->userRepository->update($remoteInfo, $user->id);
        Auth::login($user, true);

        if (Auth::check()) {
            return Auth::user();
        } else {
            throw new AuthException('User is not authorized');
        }
    }

    public function getRemoteUserInfo($cookie) {
        $ch = curl_init();
        /*
         * Hardcoded url!
         */
        curl_setopt($ch, CURLOPT_URL,            'http://team.binary-studio.com/auth/api/me');
        curl_setopt($ch, CURLOPT_HEADER,         1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT,        30);
        curl_setopt($ch, CURLOPT_COOKIE,        "x-access-token=".$cookie);
        $response = curl_exec($ch);
        $header_size = curl_getinfo($ch,CURLINFO_HEADER_SIZE);
        $resultBody = substr($response, $header_size );
        return json_decode($resultBody);
    }
}