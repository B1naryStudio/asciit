<?php

namespace App\Services\Auth;

use App\Repositories\Contracts\RoleLocalRepository;
use App\Repositories\Contracts\RoleGlobalRepository;
use App\Services\Auth\Contracts\AuthServiceInterface;
use App\Services\Auth\Exceptions\AuthException;
use App\Services\Auth\Exceptions\TokenInCookieExpiredException;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Token;
use App\Repositories\Contracts\UserRepository;
use Prettus\Repository\Exceptions\RepositoryException;
use App\Services\Auth\Contracts\UserUpdater;
use App\Services\Auth\Exceptions\UpdatingFailureException;
use Illuminate\Support\Facades\Log;
use App\Repositories\Entities\User;

class AuthService implements AuthServiceInterface
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $email;
    protected $password;
    protected $userRepository;
    protected $roleGlobalRepository;
    protected $roleLocalRepository;
    protected $userUpdater;

    public function __construct(
        UserRepository $userRepository,
        RoleGlobalRepository $roleGlobalRepository,
        RoleLocalRepository $roleLocalRepository,
        UserUpdater $userUpdater
    ) {
        $this->userRepository = $userRepository;
        $this->roleLocalRepository = $roleLocalRepository;
        $this->roleGlobalRepository = $roleGlobalRepository;
        $this->userUpdater = $userUpdater;
    }

    public function authenticate(array $data)
    {
        if (
            Auth::attempt([
                'email' => $data['email'],
                'password' => $data['password']
            ])
        ) {
            return $this->userRepository->findWithRelations(
                Auth::id(),
                ['localRole']
            );
        } else {
            return Response::json(['error' => 'Wrong login or password'], 404);
        }
    }
    
    public function logout()
    {
        try {
            Auth::logout();
        } catch(\Exception $e) {
            throw new AuthException($e->getMessage(), null, $e);
        }
    }

    public function getUser()
    {
        if (Auth::check()) {
            return $this->userRepository->findWithRelations(
                Auth::id(),
                ['localRole']
            );
        } else {
            throw new AuthException('User is not authorized');
        }
    }

    public function getUserFromCookie($cookie)
    {
        $tokenObject = new Token($cookie);

        // Get a payload info from the token
        try {
            $payload = JWTAuth::decode($tokenObject);
        } catch (TokenExpiredException $e) {
            $message = 'Token in cookie was expired';
            throw new TokenInCookieExpiredException($message, null, $e);
        }

        // Get user by the payload info
        try {
            $user = $this->userUpdater->updateBaseInfo($payload);
        } catch (RepositoryException $e) {
            throw new AuthException($e->getMessage(), null, $e);
        }

        // Attempt to update his profile by API or just log the error
        try {
            $user = $this->userUpdater
                ->updateAdditionalInfo($cookie, $user);
        } catch (UpdatingFailureException $e) {
            Log::warning(
                'An additional user information was\'nt updated. ' .
                $e->getMessage()
            );
        }

        // Login
        Auth::login($user, true);

        // Return an actual user model if login passes
        if (Auth::check()) {
            return $this->userRepository->findWithRelations(
                Auth::id(),
                ['localRole']
            );
        } else {
            throw new AuthException('Login error. User is not authorized.');
        }
    }

    public function updateUser(array $data, $id)
    {
        try {
            $user = $this->userRepository->update($data, $id);
        } catch (RepositoryException $e) {
            throw new AuthException(
                $e->getMessage(),
                null,
                $e
            );
        }

        return $user;
    }

    /**
     * @param int $newRoleId
     * @param User $user
     * @return User
     */
    public function updateUserRole($newRoleId, User $user)
    {
        try {
            $entitledUser = $this->userRepository->setProtectedProperty(
                $user,
                'local_role_id',
                $newRoleId
            );
            $role = $this->roleLocalRepository->find($newRoleId);
            $entitledUser->local_role = $role;
        } catch (RepositoryException $e) {
            throw new AuthException(
                $e->getMessage(),
                null,
                $e
            );
        }

        return $entitledUser;
    }

    /**
     * @param int|null $pageSize
     * @return mixed
     */
    public function getAllUsers($pageSize = null)
    {
        try {
            $users = $this->userRepository
                ->with('localRole')
                ->with('globalRole')
                ->paginate($pageSize);
        } catch (RepositoryException $e) {
            throw new AuthException(
                $e->getMessage() . ' Cannot return the users list.',
                null,
                $e
            );
        }

        return $users;
    }

    public function getLocalRoles()
    {
        try {
            $roles = $this->roleLocalRepository->all();
        } catch (RepositoryException $e) {
            throw new AuthException(
                $e->getMessage() . ' Cannot return the roles list.',
                null,
                $e
            );
        }

        return $roles;
    }

    public function getGlobalRoles()
    {
        try {
            $roles = $this->roleGlobalRepository
                ->with('local')
                ->all();
        } catch (RepositoryException $e) {
            throw new AuthException(
                $e->getMessage() . ' Cannot return the roles list.',
                null,
                $e
            );
        }

        return $roles;
    }

    public function mapRoles(array $data, $roleId)
    {
        $localRole = $this->roleLocalRepository->find($data['local_id']);
        $globalRole = $this->roleGlobalRepository
            ->with('local')
            ->find($roleId);

        $localRole->globals()->save($globalRole);

        return $this->roleGlobalRepository
            ->with('local')
            ->find($roleId);
    }
}