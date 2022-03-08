<?php
namespace App\Services\Auth;

use App\Exceptions\ApplicationException;
use App\Helpers\Message;
use App\Http\Dtos\Login\LoginDto;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

/**
 * ログインを行うサービスクラス
 *
 * @package   App\Services\Auth
 * @version   1.0
 */
class LoginServiceImpl implements ILoginService
{
    /**
     * {@inheritdoc}
     */
    public function login(array $credentials): LoginDto
    {
        if (!Auth::attempt($credentials)) {
            throw new ApplicationException(Message::getMessage('messages.E.autherror'), Response::HTTP_UNAUTHORIZED);
        }
        $member = Auth::user();
        return new LoginDto($member->createPlainTextToken('authenticated'), $member);
    }
}
