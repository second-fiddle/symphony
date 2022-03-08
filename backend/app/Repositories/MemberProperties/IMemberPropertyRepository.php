<?php

namespace App\Repositories\MemberProperties;

use App\Models\MemberProperty;

/**
 * member_propertiesテーブルリポジトリ定義
 *
 * @package   App\Repositories\MemberProperties
 * @version   1.0
 */
interface IMemberPropertyRepository
{
    /**
     * 物件ID及び部屋番号を基にmember_propertiesを取得する
     *
     * @access public
     * @param integer $propertyId 物件ID
     * @param string $roomNo 部屋番号
     * @return MemberProperty|null
     */
    public function findByPropertyIdAndRoomNo($propertyId, $roomNo): ?MemberProperty;
    /**
     * 物件にnicknameが登録を済みか判定する
     *
     * @param integer $propertyId 物件ID
     * @param string $nickname ニックネーム
     * @return boolean true: 存在する, false: 存在しない
     */
    public function existsNickname($propertyId, $nickname): bool;
}
