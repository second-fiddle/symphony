<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Http\JsonResponseTrait;
use App\Http\Requests\Api\Auth\SignupIdenifyRequest;
use App\Http\Requests\Api\Auth\SignupProfileRequest;
use App\Http\Requests\Api\Auth\SignupStoreRequest;
use App\Services\Members\IStoreService;
use App\Services\TemporaryMembers\IIdentifyService;

/**
 * 会員登録コントローラー
 *
 * @package   App\Http\Controllers\Api\Auth
 * @version   1.0
 */
class SignupController extends Controller
{
    use JsonResponseTrait;

    /**
     * コンストラクタ
     *
     * @access public
     * @param \App\Services\TemporaryMembers\IIdentifyService $identifyService 本人確認サービス
     * @param \App\Services\Members\IStoreService $storeService 会員サービス
     * @return void
     */
    public function __construct(
        IIdentifyService $identifyService,
        IStoreService $storeService
    ) {
        $this->identifyService = $identifyService;
        $this->storeService = $storeService;
    }
    /**
     * 本人確認
     *
     * @access public
     * @param \App\Http\Requests\Api\Auth\SignupIdenifyRequest $request リクエスト
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse レスポンス
     * @throws \App\Exceptions\ApplicationException
     */
    public function identify(SignupIdenifyRequest $request)
    {
        $params = $request->getParams();

        $response = $this->identifyService->identify($params);

        return $this->success($response);
    }
    /**
     * プロフィール確認
     *
     * @access public
     * @param \App\Http\Requests\Api\Auth\SignupProfileRequest $request リクエスト
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse レスポンス
     * @throws \App\Exceptions\ApplicationException
     */
    public function profile(SignupProfileRequest $request)
    {
        return $this->success();
    }
    /**
     * 会員登録
     *
     * @access public
     * @param \App\Http\Requests\Api\Auth\SignupStoreRequest $request リクエスト
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse レスポンス
     * @throws \App\Exceptions\ApplicationException
     */
    public function register(SignupStoreRequest $request)
    {
        $params = $request->getParams();
        $response = $this->storeService->store($params);
        return $this->success($response);
    }
}
