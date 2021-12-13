<?php
namespace App\Helpers\Utils;

use Illuminate\Support\Str;

/**
 * 文字列ヘルパークラス
 */
class StringHelper
{
  /**
   * 文字列のパラメータ部にバインドパラメータを設定する。
   *
   * @param string $source　パラメータ適用文字列
   * @param array $parameters　バインドパラメータ
   * @return string バインドパラメータを適用した文字列
   */
  public static function bindParameter(string $source, array $parameters = []): string
  {
    $string = $source;
    if (empty($parameters)) {
      return $string;
    }
    return Str::replaceArray('?', $parameters, $source);
  }
}
