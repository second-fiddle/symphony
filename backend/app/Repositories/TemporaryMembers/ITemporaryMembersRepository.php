<?php

namespace App\Repositories\TemporaryMembers;

use App\Models\TemporaryMember;

/**
 * temporary_membersテーブルリポジトリ定義
 *
 * @package   App\Repositories\TemporaryMembers
 * @version   1.0
 */
interface ITemporaryMembersRepository
{
    /**
     * 主キーを基に仮会員を取得する
     *
     * @access public
     * @param integer $id 主キー
     * @return TemporaryMember|null 仮会員モデル
     */
    public function findById($id): ?TemporaryMember;
    /**
     * 物件コード及び部屋番号を基に仮会員を取得する
     *
     * @access public
     * @param string propertyCd 物件コード
     * @param string roomNo 部屋番号
     * @return TemporaryMember|null 仮会員モデル
     */
    public function findByPropertyCdAndRoomNo(string $propertyCode, string $roomNo): ?TemporaryMember;
    /**
     * 仮会員を登録済み状態に更新する
     *
     * @access public
     * @param integer $id 主キー
     * @return bool true: 更新成功, false: 更新失敗
     */
    public function authenticated($id): bool;
}
