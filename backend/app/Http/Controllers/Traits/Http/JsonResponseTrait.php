<?php
namespace App\Http\Controllers\Traits\Http;

use App\Http\Dtos\IDto;

/**
 * メール認証コントローラー
 *
 * @package   App\Http\Controllers\Traits\Http
 * @version   1.0
 */
trait JsonResponseTrait
{
    /**
     * 正常終了のレスポンスを返す
     *
     * @access public
     * @param \App\Http\Dtos\IDto $data レスポンス
     * @param string $message メッセージ
     * @param number $status HTTPステータス
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse レスポンス
     */
    public function success(IDto $data = null, $message = '', $status = 200)
    {
        $responseData = is_null($data) ? [] : $data->toArray();

        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $responseData,
        ]);
    }
}
