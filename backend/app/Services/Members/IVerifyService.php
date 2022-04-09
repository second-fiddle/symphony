<?php

namespace App\Services\Members;

/**
 * 会員メール認証サービス定義
 *
 * @package   App\Services\Members
 * @version   1.0
 */
interface IVerifyService
{
    /**
     * 会員メール認証を行う。<br>
     * 認証成功時、仮会員を認証済みに更新する。
     *
     * @param number $id 会員物件テーブル主キー
     * @param string $hash 会員メールアドレスSHA1値
     * @return void
     */
    public function verify($id, $hash);
}
