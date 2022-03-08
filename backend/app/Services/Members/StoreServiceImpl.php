<?php
namespace App\Services\Members;

use App\Aspect\Annotation\Transactional;
use App\Http\Dtos\Members\MemberDto;
use App\Repositories\Members\IMemberRepository;
use App\Repositories\TemporaryMembers\ITemporaryMembersRepository;

/**
 * 会員登録を行うサービスクラス
 *
 * @package   App\Services\Members
 * @version   1.0
 */
class StoreServiceImpl implements IStoreService
{
    /**
     * コンストラクタ
     *
     * @access public
     * @param \App\Repositories\TemporaryMembers\ITemporaryMembersRepository $temporaryMembersRepository 会員物件リポジトリ
     * @param \App\Repositories\Members\IMemberRepository $memberRepository 会員リポジトリ
     * @return void
     */
    public function __construct(
        ITemporaryMembersRepository $temporaryMembersRepository,
        IMemberRepository $memberRepository
    ) {
        $this->temporaryMembersRepository = $temporaryMembersRepository;
        $this->memberRepository = $memberRepository;
    }
    /**
     * {@inheritdoc}
     * @Transactional()
     */
    public function store($params): MemberDto
    {
        $temporaryMember = $this->temporaryMembersRepository->findById($params['temporaryMemberId']);
        $memberParams = $params;
        $memberParams['roomNo'] = $temporaryMember->room_no;
        $member = $this->memberRepository->storeRelateProperty($memberParams, $temporaryMember->property->id);

        $member->sendEmailVerificationNotificationEx($temporaryMember->id);

        return new MemberDto($member);
    }
}
