<?php

namespace App\Helpers;

use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;

/**
 * 暗号化定義
 *
 * @package   App\Support
 * @version   1.0
 */
class Encryption
{
    /**
     * 引数を暗号化する
     *
     * @access public
     * @param mixed $source 暗号化対象
     * @return string|null 暗号化結果
     */
    public static function encrypt(mixed $source): ?string
    {
        if (empty($source)) {
            return null;
        }

        $enc = $source;
        if (is_array($source)) {
            $enc = json_encode($source);
        }

        return Crypt::encryptString($enc);
    }
    /**
     * 引数を復号する
     *
     * @access public
     * @param string $source 復号化対象
     * @return mixed | null
     */
    public static function decrypt($source): ?mixed
    {
        try {
            return Crypt::decryptString($source);
        } catch (DecryptException $ex) {
            return null;
        }
    }
}
