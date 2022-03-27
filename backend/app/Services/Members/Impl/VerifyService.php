<?php
namespace App\Services\Members\Impl;

use App\Aspect\Annotation\Transactional;
use App\Exceptions\VerificationExpiredException;
use App\Repositories\MemberProperties\IMemberPropertyRepository;
use App\Repositories\TemporaryMembers\ITemporaryMembersRepository;
use App\Services\Members\IVerifyService;

/**
 * 会員メール認証を行うサービスクラス
 *
 * @package   App\Services\Members
 * @version   1.0
 */
class VerifyService implements IVerifyService
{
    /**
     * コンストラクタ
     *
     * @access public
     * @param \App\Repositories\TemporaryMembers\ITemporaryMembersRepository $temporaryMembersRepository 会員物件リポジトリ
     * @param \App\Repositories\MemberProperties\IMemberPropertyRepository $memberPropertyRepository 会員リポジトリ
     * @return void
     */
    public function __construct(
        ITemporaryMembersRepository $temporaryMembersRepository,
        IMemberPropertyRepository $memberPropertyRepository
    ) {
        $this->temporaryMembersRepository = $temporaryMembersRepository;
        $this->memberPropertyRepository = $memberPropertyRepository;
    }
    /**
     * {@inheritdoc}
     * @Transactional()
     */
    public function verify($id, $hash)
    {
        $temporaryMember = $this->temporaryMembersRepository->findById($id);
        if (is_null($temporaryMember)) {
            throw new VerificationExpiredException();
        }
        $memberProperty = $this->memberPropertyRepository->findByPropertyIdAndRoomNo(
            $temporaryMember->property_id,
            $temporaryMember->room_no
        );
        $member = $memberProperty->member;

        if (sha1($member->getEmailForVerification()) != $hash) {
            throw new VerificationExpiredException();
        }

        if (!$member->hasVerifiedEmail()) {
            $member->markEmailAsVerified();
        }

        $this->temporaryMembersRepository->authenticated($id);
    }
}
