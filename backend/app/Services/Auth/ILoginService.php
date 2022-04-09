<?php

namespace App\Services\Auth;

use App\Http\Dtos\Login\LoginDto;

/**
 * ログインサービス定義
 *
 * @package   App\Services\Auth
 * @version   1.0
 */
interface ILoginService
{
    /**
     * ログイン
     *
     * @param array $credentials ログインパラメーター
     * @return \App\Http\Dtos\Login\LoginDto 登録結果
     * @throws \App\Exceptions\ApplicationException
     */
    public function login(array $credentials): LoginDto;
}
