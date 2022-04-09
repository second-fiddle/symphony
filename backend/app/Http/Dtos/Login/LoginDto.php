<?php
namespace App\Http\Dtos\Login;

use App\Http\Dtos\IDto;
use App\Models\Member;

/**
 * ログイン実行結果
 *
 * @package   App\Http\Dtos\Login
 * @version   1.0
 */
class LoginDto implements IDto
{
    private $token;
    private $id;
    private $lastName;
    private $firstName;
    private $lastNameRuby;
    private $firstNameRuby;
    private $nickName;
    private $tel1;
    private $tel2;
    private $email;

    /**
     * コンストラクタ
     *
     * @access public
     * @param string $token トークン
     * @param \App\Models\Member $member 会員モデル
     */
    public function __construct(string $token, Member $member)
    {
        $this->token         = $token;
        $this->id            = $member->id;
        $this->lastName      = $member->lastName;
        $this->firstName     = $member->firstName;
        $this->lastNameRuby  = $member->lastNameRuby;
        $this->firstNameRuby = $member->firstNameRuby;
        $this->nickName      = $member->nickname;
        $this->tel1          = $member->tel1;
        $this->tel2          = $member->tel2;
        $this->email         = $member->email;
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
            'token'         => $this->token,
            'id'            =>$this->id,
            'lastName'      => $this->lastName,
            'firstName'     => $this->firstName,
            'lastNameRuby'  => $this->lastNameRuby,
            'firstNameRuby' => $this->firstNameRuby,
            'nickName'      => $this->nickName,
            'tel1'          => $this->tel1,
            'tel2'          => $this->tel2,
            'email'         => $this->email,
        ];
    }
}
