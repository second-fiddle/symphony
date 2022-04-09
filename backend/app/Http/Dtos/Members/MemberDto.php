<?php
namespace App\Http\Dtos\Members;

use App\Http\Dtos\IDto;
use App\Models\Member;

/**
 * 会員データ結果
 *
 * @package   App\Http\Dtos\Members
 * @version   1.0
 */
class MemberDto implements IDto
{
    private $member;

    /**
     * コンストラクタ
     *
     * @access public
     * @param \App\Models\Member 会員モデル
     */
    public function __construct(Member $member)
    {
        $this->member = $member;
    }
    /**
     * 配列変換
     *
     * @access public
     * @return array
     */
    public function toArray(): array
    {
        return $this->member->toArray();
    }
}
