<?php

namespace App\Repositories\MemberProperties;

use App\Models\MemberProperty;

/**
 * member_propertiesテーブルリポジトリを実装する。
 *
 * @package   App\Repositories\MemberProperties
 * @version   1.0
 */
class MemberPropertyRepositoryImpl implements IMemberPropertyRepository
{
    /**
     * {@inheritdoc}
     */
    public function findByPropertyIdAndRoomNo($propertyId, $roomNo): ?MemberProperty
    {
        return MemberProperty::where([
            'property_id' => $propertyId,
            'room_no' => $roomNo
        ])
        ->first();
    }
    /**
     * {@inheritdoc}
     */
    public function existsNickname($propertyId, $nickname): bool
    {
        return MemberProperty::join('members', function ($join) {
            $join->on('members.id', 'member_properties.member_id')
                        ->whereNotNull('members.email_verified_at');
        })
            ->where('property_id', $propertyId)
            ->where('nickname', $nickname)
            ->exists();
    }
}
