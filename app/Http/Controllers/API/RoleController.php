<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\Auth\Contracts\AuthServiceInterface;
use Illuminate\Support\Facades\Response;
use App\Services\Auth\Exceptions\AuthException;

class RoleController extends Controller
{
    private $authService;

    public function __construct(AuthServiceInterface $authService)
    {
        $this->authService = $authService;

        $this->middleware('rbac');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $type = $request->get('type');
        try {
            if ($type === 'global') {
                $roles = $this->authService->getGlobalRoles();
            } else {
                $roles = $this->authService->getLocalRoles();
            }
        } catch (AuthException $e) {
            return Response::json([
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ], 404);
        }

        return Response::json($roles, 200, [], JSON_NUMERIC_CHECK);
    }

    public function update(Request $request, $role_id)
    {
        // Update user
        try {
            $localRole = $this->authService->mapRoles($request->all(), $role_id);
        } catch (AuthException $e) {
            return Response::json([
                'error' => [$e->getMessage()]
            ], 500);
        }

        return Response::json($localRole, 200, [], JSON_NUMERIC_CHECK);
    }
}
