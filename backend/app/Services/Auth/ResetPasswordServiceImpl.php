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
class ResetPasswordServiceImpl implements IResetPasswordService
{
    /**
     * {@inheritdoc}
     */
    public function reset(array $params): bool
    {
        $status = Password::sendResetLink($params);
        if ($status !== Password::RESET_LINK_SENT) {
            throw new ApplicationException(Message::getMessage('messages.E.reset.password.failed'));
        }

        return true;
    }
}
