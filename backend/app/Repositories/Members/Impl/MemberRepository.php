<?php

namespace App\Repositories\Members\Impl;

use App\Models\Member;
use App\Repositories\MemberProperties\IMemberPropertyRepository;
use App\Repositories\Members\IMemberRepository;

/**
 * membersテーブルリポジトリ定義
 *
 * @package   App\Repositories\Members
 * @version   1.0
 */
class MemberRepository implements IMemberRepository
{
    /**
     * コンストラクタ
     *
     * @access public
     * @param \App\Repositories\MemberProperties\MemberPropertyRepository $memberPropertyRepository 会員物件リポジトリ
     * @return void
     */
    public function __construct(
        IMemberPropertyRepository $memberPropertyRepository
    ) {
        $this->memberPropertyRepository = $memberPropertyRepository;
    }
    /**
     * {@inheritdoc}
     */
    public function storeRelateProperty($memberParams, $propertyId): Member
    {
        $member = Member::updateOrCreate(['email' => $memberParams['email']], $memberParams);
        $member->properties()->wherePivot('property_id', $propertyId)->detach();
        $member->properties()->attach([
            $propertyId => [
                'room_no'  => $memberParams['roomNo'],
                'nickname' => $memberParams['nickname']
            ]
        ]);

        return $member;
    }
}
