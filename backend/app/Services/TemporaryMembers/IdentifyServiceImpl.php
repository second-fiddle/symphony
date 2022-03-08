<?php
namespace App\Services\TemporaryMembers;

use Illuminate\Http\Response;
use App\Exceptions\ApplicationException;
use App\Helpers\Message;
use App\Http\Dtos\Signup\IdentityDto;
use App\Repositories\TemporaryMembers\ITemporaryMembersRepository;

/**
 * 本人確認を行うサービスクラス
 *
 * @package   App\Services\TemporaryMembers
 * @version   1.0
 */
class IdentifyServiceImpl implements IIdentifyService
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
    public function identify($params): IdentityDto
    {
        $temporaryMember = $this->temporaryMembersRepository->findByPropertyCdAndRoomNo($params['propertyCd'], $params['roomNo']);
        if (is_null($temporaryMember)) {
            throw new ApplicationException(Message::getMessage('messages.E.autherror'), Response::HTTP_UNAUTHORIZED);
        } elseif ($temporaryMember->authenticated) {
            throw new ApplicationException(Message::getMessage('messages.E.signup.identify.authenticated'), Response::HTTP_UNAUTHORIZED);
        }
        $hasher = app('hash');
        if ($hasher->check($params['password'], $temporaryMember->password)) {
            $token = $temporaryMember->createToken('identify')->plainTextToken;
            return new IdentityDto($token, $temporaryMember);
        }

        throw new ApplicationException(Message::getMessage('messages.E.autherror'), Response::HTTP_UNAUTHORIZED);
    }
}
