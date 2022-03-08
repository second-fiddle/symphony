<?php

namespace App\Services\Auth;

/**
 * パスワード変更サービス定義
 *
 * @package   App\Services\Auth
 * @version   1.0
 */
interface IChangePasswordService
{
    /**
     * パスワード変更を行う
     *
     * @param array $params パスワード再設定パラメーター
     * @return bool true: パスワード変更成功
     * @throws \App\Exceptions\ApplicationException
     */
    public function changePassword(array $params): bool;
}
