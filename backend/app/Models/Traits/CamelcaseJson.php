<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * モデルでキャメルケースのJSONデータを扱うためのTrait。
 *
 * @package   App\Models\Traits
 * @version   1.0
 */
trait CamelcaseJson
{
    /**
     * 連想配列で渡された値をモデルのプロパティに格納する。
     *
     * @access public
     * @param array $attributes 格納する連想配列。
     * @return $this
     * @throws \Illuminate\Database\Eloquent\MassAssignmentException
     */
    public function fill(array $attributes) : Model
    {
        // キーがキャメルケースの場合、スネークケースに変換して処理する
        // ※ 悪意あるユーザーにuser_id=NGとuserId=OKの両方が指定されてバリデーションを
        //    すり抜けるようなケースを防ぐため、一旦スネークケースのパラメータのみ先に処理して、
        //    その後にキャメルケースの変換を実施
        $converted = [];
        foreach ($attributes as $key => $value) {
            if (strpos($key, '_') !== false) {
                $converted[Str::snake($key)] = $value;
            }
        }
        foreach ($attributes as $key => $value) {
            if (strpos($key, '_') === false) {
                $converted[Str::snake($key)] = $value;
            }
        }

        return parent::fill($converted);
    }
    /**
     * モデルを連想配列に変換する。
     *
     * @access public
     * @return array モデルを変換した連想配列。
     */
    public function toArray() : array
    {
        // キーがスネークケースの場合、キャメルケースに変換して返す
        $converted = [];
        foreach (parent::toArray() as $key => $value) {
            $converted[Str::camel($key)] = $value;
        }

        return $converted;
    }
}
