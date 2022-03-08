<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\Message;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Http\JsonResponseTrait;
use App\Http\Requests\Api\Auth\ChangepasswordRequest;
use App\Http\Requests\Api\Auth\ResetPasswordRequest;
use App\Services\Auth\IChangePasswordService;
use App\Services\Auth\IResetPasswordService;

/**
 * パスワード再設定コントローラー
 *
 * @package   App\Http\Controllers\Api\Auth
 * @version   1.0
 */
class ResetPasswordController extends Controller
{
    use JsonResponseTrait;

    /**
     * コンストラクタ
     *
     * @access public
     * @param \App\Services\Auth\IResetPasswordService $resetPasswordService パスワード再設定サービス
     * @param \App\Services\Auth\IChangePasswordService $changePasswordService ログアウトサービス
     * @return void
     */
    public function __construct(
        IResetPasswordService $resetPasswordService,
        IChangePasswordService $changePasswordService
    ) {
        $this->resetPasswordService = $resetPasswordService;
        $this->changePasswordService = $changePasswordService;
    }
    /**
     * パスワード再設定用のメールを送信する
     *
     * @access public
     * @param \App\Http\Requests\Api\Auth\ResetPasswordRequest $request リクエスト
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse レスポンス
     * @throws \App\Exceptions\ApplicationException
     */
    public function reset(ResetPasswordRequest $request)
    {
        $reqParam = $request->getParams();

        $this->resetPasswordService->reset($reqParam);

        return $this->success(null, Message::getMessage('messages.N.reset.password.success'));
    }
    /**
     * パスワードを変更する
     *
     * @access public
     * @param \App\Http\Requests\Api\Auth\ChangepasswordRequest $request リクエスト
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse レスポンス
     * @throws \App\Exceptions\ApplicationException
     */
    public function changePassword(ChangepasswordRequest $request)
    {
        $reqParam = $request->getParams();

        $this->changePasswordService->changePassword($reqParam);

        return $this->success(null, Message::getMessage('messages.N.change.password.success'));
    }
}
