<?php
namespace App\Http\Dtos\Signup;

use App\Http\Dtos\IDto;

/**
 * 本人確認サービス結果
 *
 * @package   App\Http\Dtos\Signup
 * @version   1.0
 */
class IdentityDto implements IDto
{
    private $token;
    private $temporaryMemberId;
    private $propertyName;
    private $roomNo;

    /**
     * コンストラクタ
     *
     * @access public
     * @param string $token トークン
     * @param \App\Models\TemporaryMember 仮会員モデル
     */
    public function __construct($token, $temporaryMember)
    {
        $this->token = $token;
        $this->temporaryMemberId = $temporaryMember->id;
        $this->propertyName = $temporaryMember->property->name;
        $this->roomNo = $temporaryMember->room_no;
    }
    /**
     * 配列変換
     *
     * @access public
     * @return array
     */
    public function toArray(): array
    {
        return [
            'token' => $this->token,
            'temporaryMemberId' => $this->temporaryMemberId,
            'propertyName' => $this->propertyName,
            'roomNo' => $this->roomNo,
        ];
    }
}
