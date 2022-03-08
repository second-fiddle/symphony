<?php

namespace App\Services\Members;

use App\Http\Dtos\Members\MemberDto;

/**
 * 会員登録サービス定義
 *
 * @package   App\Services\Members
 * @version   1.0
 */
interface IStoreService
{
    /**
     * 会員登録
     *
     * @param array $params 登録パラメーター
     * @return \App\Http\Dtos\Members\MembetDto 登録結果
     */
    public function store($params): MemberDto;
}
