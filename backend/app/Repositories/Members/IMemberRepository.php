<?php

namespace App\Repositories\Members;

use App\Models\Member;

/**
 * membersテーブルリポジトリ定義
 *
 * @package   App\Repositories\Members
 * @version   1.0
 */
interface IMemberRepository
{
    /**
     * 会員登録及び物件との紐づけを登録する。
     *
     * @param \App\Models\Membe $member 会員モデル
     * @param integer $propertyId 物件ID
     * @return Member 会員モデル
     */
    public function storeRelateProperty($member, $propertyId): Member;
}
