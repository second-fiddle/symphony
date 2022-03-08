<?php
namespace App\Services\Auth;

use App\Exceptions\ApplicationException;
use App\Helpers\Message;
use Illuminate\Support\Facades\Password;

/**
 * パスワード変更サービス定義
 *
 * @package   App\Services\Auth
 * @version   1.0
 */
class ChangePasswordServiceImpl implements IChangePasswordService
{
    /**
     * {@inheritdoc}
     */
    public function changePassword(array $params): bool
    {
        $status = Password::reset(
            $params,
            function ($user, $password) {
                $user->forceFill(['password' => $password]);
                $user->save();
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            throw new ApplicationException(Message::getMessage('messages.E.change.password.failed'));
        }

        return true;
    }
}
