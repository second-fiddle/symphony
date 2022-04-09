<?php
namespace App\Services\Auth\Impl;

use App\Services\Auth\ILogoutService;
use Illuminate\Support\Facades\Auth;

/**
 * ログアウトを行うサービスクラス
 *
 * @package   App\Services\Auth
 * @version   1.0
 */
class LogoutService implements ILogoutService
{
    /**
     * {@inheritdoc}
     */
    public function logout(): void
    {
        Auth::user()->tokens()->delete();
        Auth::guard('web')->logout();
    }
}
