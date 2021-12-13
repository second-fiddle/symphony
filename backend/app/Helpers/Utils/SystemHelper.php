<?php
namespace App\Helpers\Utils;

use Lang;

/**
 * システム共通ヘルパークラス
 */
class SystemHelper
{
  /**
   * メッセージに動的パラメータを適用した文字列を取得する。
   *
   * @param string $messageCd　メッセージコード
   * @param array $parameters　バインドパラメータ
   * @return string バインドパラメータを適用した文字列
   */
  public static function getMessage(string $messgeCd, array $parameters = []): string
  {
    return StringHelper::bindParameter(Lang::get($messgeCd), $parameters);
  }
}
