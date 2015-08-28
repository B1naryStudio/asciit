<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\App;

class DetectLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $cookieLang = Cookie::get('i18next');

        if ($cookieLang) {
            App::setLocale($cookieLang);
        } elseif ($request->header('Accept-Language')) {
            App::setLocale($request->header('Accept-Language'));
        }

        return $next($request);
    }
}
