<?php
namespace App\Services\Auth;

use Illuminate\Support\Facades\Auth;

/**
 * ログアウトを行うサービスクラス
 *
 * @package   App\Services\Auth
 * @version   1.0
 */
class LogoutServiceImpl implements ILogoutService
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
