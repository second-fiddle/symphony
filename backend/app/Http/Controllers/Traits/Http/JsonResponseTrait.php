<?php
namespace App\Http\Controllers\Traits\Http;

trait JsonResponseTrait
{
    /**
     * 正常終了のレスポンスを返す
     *
     * @param array $data レスポンス
     * @param string $message メッセージ
     * @param number $status HTTPステータス
     * @return json
     */
    public function success($data = [], $message = '', $status = 200)
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data,
        ]);
    }
}
