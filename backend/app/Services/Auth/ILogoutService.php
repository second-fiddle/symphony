<?php

namespace App\Services\Auth;

/**
 * ログインサービス定義
 *
 * @package   App\Services\Auth
 * @version   1.0
 */
interface ILogoutService
{
    /**
     * ログアウト
     *
     * @return void
     * @throws \App\Exceptions\ApplicationException
     */
    public function logout(): void;
}
