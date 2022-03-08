<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Http\JsonResponseTrait;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Services\Auth\ILoginService;
use App\Services\Auth\ILogoutService;

/**
 * ログインコントローラー
 *
 * @package   App\Http\Controllers\Api\Auth
 * @version   1.0
 */
class LoginController extends Controller
{
    use JsonResponseTrait;

    /**
     * コンストラクタ
     *
     * @access public
     * @param \App\Services\Auth\ILoginService $loginService ログインサービス
     * @param \App\Services\Auth\ILogoutService $logoutService ログアウトサービス
     * @return void
     */
    public function __construct(
        ILoginService $loginService,
        ILogoutService $logoutService
    ) {
        $this->loginService = $loginService;
        $this->logoutService = $logoutService;
    }
    /**
     * ログイン
     *
     * @access public
     * @param  \App\Http\Requests\Api\Auth\LoginRequest  $request リクエスト
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse レスポンス
     * @throws \App\Exceptions\ApplicationException
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->getParams();
        $loginDto = $this->loginService->login($credentials);

        return $this->success($loginDto);
    }
    /**
     * ログアウト
     *
     * @access public
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse レスポンス
     */
    public function logout()
    {
        $this->logoutService->logout();
        return $this->success();
    }
}
