<?php

namespace App\Http\Middleware;

use App\Exceptions\SessionTimeoutException;
use Closure;
use Illuminate\Http\Request;

class VerifyExpiredApiToken
{
    /**
     * チェックを除外するリクエストURLのパターンを指定
     * @var array
     */
    protected $except = [
        'api/refresh',
        'api/signup/identify',
    ];

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param Closure $next
     * @return mixed
     *
     * @throws SessionTimeoutException
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->is($this->except)) {
            $user = $request->user();
            $token = !!$user ? $user->currentAccessToken() : null;
            if (!$token || $token->isExpiredToken()) {
                throw new SessionTimeoutException();
            }
        }
        return $next($request);
    }
}
