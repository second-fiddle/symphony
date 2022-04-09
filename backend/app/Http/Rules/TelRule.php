<?php
namespace App\Http\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Helpers\Message;
use App\ValueObjects\TelVo;

/**
 * 電話番号入力チェック定義
 *
 * @package   App\Http\Rules
 * @version   1.0
 */
class TelRule implements Rule
{
    /**
     * 入力チェック
     *
     * @access public
     * @param string $attribute 属性名
     * @param string $value 電話番号
     * @return bool true: 正常, false: 異常
     */
    public function passes($attribute, $value)
    {
        if (!$value) {
            return true;
        }

        return (new TelVo($value))->validate();
    }
    /**
     * メッセージ定義
     *
     * @access public
     * @return string
     */
    public function message(): string
    {
        return Message::getMessage('validation.tel');
    }
}
