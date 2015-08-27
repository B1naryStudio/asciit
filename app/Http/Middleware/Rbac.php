<?php

namespace App\Http\Middleware;

use Closure;
use SmartCrowd\Rbac\Middleware\RbacMiddleware;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Support\Facades\Response;

class Rbac extends RbacMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $permission=null)
    {
        try {
            return parent::handle($request, $next, $permission);
        } catch (AccessDeniedHttpException $e) {
            return Response::json(['error' =>
                ['You have no permissions for this action!']
            ], 403);
        }
    }
}
