<?php

namespace App\Services\TemporaryMembers;

use App\Http\Dtos\Signup\IdentityDto;

/**
 * 仮会員本人確認サービス定義
 *
 * @package   App\Services\TemporaryMembers
 * @version   1.0
 */
interface IIdentifyService
{
    /**
     * 物件コード、部屋番号、パスワードを基に、本人確認を行う。
     *
     * @param array $params 本人確認データ（物件コード、部屋番号、パスワード）
     * @return \App\Http\Dtos\Signup\IdentityDto 本院確認結果
     * @throws \App\Exceptions\ApplicationException
     */
    public function identify($params): IdentityDto;
}
