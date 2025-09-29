<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
protected function redirectTo($request)
{
    // Nếu là request API thì trả về null để Laravel trả 401 JSON
    if ($request->expectsJson()) {
        return null;
    }

    // Nếu bạn có web login thì mới trả về route('login')
    // return route('login');
}
}
