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
        /*
         * Cookie::get('i18next'); - don't work because EncryptCookies executes
         * later and it's no seems a way to change a middleware order
         */
        if (array_key_exists('i18next' ,$_COOKIE)) {
            $lang = substr($_COOKIE['i18next'], 0, 2);
            App::setLocale($lang);
        } elseif ($request->header('Accept-Language')) {
            App::setLocale($request->header('Accept-Language'));
        }

        return $next($request);
    }
}
