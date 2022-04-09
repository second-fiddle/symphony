<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Http\JsonResponseTrait;
use App\Http\Requests\Api\Auth\VerificationRequest;
use App\Services\Members\IVerifyService;

/**
 * メール認証コントローラー
 *
 * @package   App\Http\Controllers\Api\Auth
 * @version   1.0
 */
class VerificationController extends Controller
{
    use JsonResponseTrait;

    /**
     * コンストラクタ
     *
     * @access public
     * @param \App\Services\Members\IVerifyService $verifyService メール認証サービス
     * @return void
     */
    public function __construct(
        IVerifyService $verifyService
    ) {
        $this->verifyService = $verifyService;
    }
    /**
     * メール認証
     *
     * @access public
     * @param  \App\Http\Requests\Api\Auth\VerificationRequest  $request リクエスト
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse レスポンス
     */
    public function verify($id, $hash, VerificationRequest $request)
    {
        $this->verifyService->verify($id, $hash);

        return $this->success();
    }
}
