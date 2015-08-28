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
use App\Repositories\Contracts\RoleRepository;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Token;

class AuthService implements AuthServiceInterface
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $email;
    protected $password;
    protected $roleRepository;
    protected $userRepository;

    public function __construct(
        RoleRepository $roleRepository,
        UserRepository $userRepository
    ) {
        $this->roleRepository = $roleRepository;
        $this->userRepository = $userRepository;
    }

    public function authenticate($data)
    {
        if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            return $this->userRepository->findWithRelations(
                Auth::id(),
                ['role']
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
                ['role']
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
        $this->attachRoleId($userInfo);

        $user = $this->userRepository->updateFirstOrCreate(
            ['email' => $userInfo['email']],
            $userInfo
        );

        $this->attachAdditionUserInfo($cookie, $user);
        Auth::login($user, true);

        if (Auth::check()) {
            return $this->userRepository->findWithRelations(
                Auth::id(),
                ['role']
            );
        } else {
            throw new AuthException('User is not authorized');
        }
    }

    protected function attachAdditionUserInfo($cookie, &$user) {
        $remoteInfo = (array)$this->getRemoteUserInfo($cookie);

        $this->renameArrayKeys($remoteInfo, [
            'id'      => 'binary_id',
            'name'    => 'first_name',
            'surname' => 'last_name',
        ]);

        $this->attachRoleId($remoteInfo);
        $user = $this->userRepository->update($remoteInfo, $user->id);
    }

    protected function renameArrayKeys(array &$arr, array $renamingMap)
    {
        foreach ($renamingMap as $old => $new) {
            if (array_key_exists($old, $arr)) {
                $arr[$new] = $arr[$old];
                unset($arr[$old]);
            }
        }
    }

    protected function attachRoleId(array &$arr)
    {
        if (array_key_exists('role', $arr)) {
            $role = $this->roleRepository->getByTitle($arr['role']);
            $arr['role_id'] = $role->id;
        }
    }

    protected function getRemoteUserInfo($cookie) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            url(env('AUTH_ME')));
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