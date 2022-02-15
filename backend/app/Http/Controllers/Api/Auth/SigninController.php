<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Exceptions\ApplicationException;
use App\Helpers\Utils\SystemHelper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Http\JsonResponseTrait;
use App\Http\Requests\Api\Auth\SigninIdenifyRequest;
use App\Http\Requests\Api\Auth\ResetPasswordRequest;

class SigninController extends Controller
{
    use JsonResponseTrait;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }
    /**
     * パスワード再設定耀のメールを送信する
     *
     * @param SigninIdenifyRequest $request リクエスト
     * @return レスポンス
     * @throws ApplicationException
     */
    public function identify(SigninIdenifyRequest $request)
    {
        return $this->success();
    }
}
