<?php
namespace App\Helpers;

use Illuminate\Support\Str;

/**
 * メッセージクラス
 *
 * @package   App\Helpers
 * @version   1.0
 */
class Message
{
    /**
     * メッセージに動的パラメータを適用した文字列を取得する。
     *
     * @access public
     * @param string $messageCd メッセージコード
     * @param array $parameters バインドパラメータ
     * @return string バインドパラメータを適用した文字列
     */
    public static function getMessage(string $messgeCd, array $parameters = null): string
    {
        $message = trans($messgeCd);
        if (empty($parameters)) {
            return $message;
        }
        return Str::replaceArray('?', $parameters, $message);
    }
}
