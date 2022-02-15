<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Exceptions\ApplicationException;
use App\Helpers\Utils\SystemHelper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Http\JsonResponseTrait;
use App\Http\Requests\Api\Auth\ChangepasswordRequest;
use App\Http\Requests\Api\Auth\ResetPasswordRequest;

class ResetPasswordController extends Controller
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
     * パスワード再設定用のメールを送信する
     *
     * @param ResetPasswordRequest $request リクエスト
     * @return レスポンス
     * @throws ApplicationException
     */
    public function reset(ResetPasswordRequest $request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );
        if ($status === Password::RESET_LINK_SENT) {
            return $this->success([], SystemHelper::getMessage('messages.N.reset.password.success'));
        } else {
            throw new ApplicationException(SystemHelper::getMessage('messages.E.reset.password.failed'));
        }
    }
    /**
     * パスワードを変更する
     *
     * @param ChangepasswordRequest $request リクエスト
     * @return レスポンス
     * @throws ApplicationException
     */
    public function changePassword(ChangepasswordRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ]);
                $user->save();
                // event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return $this->success([], SystemHelper::getMessage('messages.N.change.password.success'));
        } else {
            throw new ApplicationException(SystemHelper::getMessage('messages.E.change.password.failed'));
        }
    }
}
