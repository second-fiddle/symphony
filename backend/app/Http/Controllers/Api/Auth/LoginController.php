<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\ApplicationException;
use App\Helpers\Utils\SystemHelper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Http\JsonResponseTrait;
use App\Http\Requests\Api\Auth\LoginRequest;

class LoginController extends Controller
{
    use JsonResponseTrait;

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard('api');
    }
    /**
     * ログイン
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $user = null;
        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials)) {
            throw new ApplicationException(SystemHelper::getMessage('messages.E.autherror'), Response::HTTP_UNAUTHORIZED);
        }
        $user = Auth::user();
        // ※古いトークン削除&新しいトークン生成
        $user->tokens()->where('name', 'token-name')->delete();
        $token = $user->createToken('token-name')->plainTextToken;

        $data = [
          'token' => $token,
          'user'  => $user,
        ];
        return $this->success($data);
    }

    /**
     * ログアウト
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();
        return $this->success();
    }
}
