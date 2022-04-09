<?php

namespace App\Services\Auth;

/**
 * パスワード再設定サービス定義
 *
 * @package   App\Services\Auth
 * @version   1.0
 */
interface IResetPasswordService
{
    /**
     *
     *
     * @param array $params パスワード再設定パラメーター
     * @return bool true: パスワード再設定メール送信成功
     * @throws \App\Exceptions\ApplicationException
     */
    public function reset(array $params): bool;
}
