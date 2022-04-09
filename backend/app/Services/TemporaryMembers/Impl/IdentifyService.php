<?php
namespace App\Services\TemporaryMembers\Impl;

use Illuminate\Http\Response;
use App\Exceptions\ApplicationException;
use App\Helpers\Message;
use App\Http\Dtos\Signup\IdentityDto;
use App\Repositories\TemporaryMembers\ITemporaryMembersRepository;
use App\Services\TemporaryMembers\IIdentifyService;
use Illuminate\Support\Facades\Auth;

/**
 * 本人確認を行うサービスクラス
 *
 * @package   App\Services\TemporaryMembers
 * @version   1.0
 */
class IdentifyService implements IIdentifyService
{
    /**
     * コンストラクタ
     *
     * @access public
     * @param \App\Repositories\TemporaryMembers\ITemporaryMembersRepository $temporaryMembersRepository 仮会員リポジトリ
     * @return void
     */
    public function __construct(ITemporaryMembersRepository $temporaryMembersRepository)
    {
        $this->temporaryMembersRepository = $temporaryMembersRepository;
    }
    /**
     * {@inheritdoc}
     */
    public function identify($credentials): IdentityDto
    {
        if (!Auth::guard('signup')->attempt($credentials)) {
            throw new ApplicationException(Message::getMessage('messages.E.autherror'), Response::HTTP_UNAUTHORIZED);
        }
        $temporaryMember = Auth::guard('signup')->user();
        if ($temporaryMember->authenticated) {
            throw new ApplicationException(Message::getMessage('messages.E.signup.identify.authenticated'), Response::HTTP_UNAUTHORIZED);
        }
        return new IdentityDto($temporaryMember->createPlainTextToken(), $temporaryMember);
    }
}
