<?php
namespace App\Http\Dtos\Login;

use App\Http\Dtos\IDto;

/**
 * トークンリフレッシュ実行結果
 *
 * @package   App\Http\Dtos\Login
 * @version   1.0
 */
class TokenDto implements IDto
{
    private $token;

    /**
     * コンストラクタ
     *
     * @access public
     * @param string $token トークン
     */
    public function __construct(string $token)
    {
        $this->token = $token;
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
        ];
    }
}
