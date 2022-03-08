<?php

namespace App\Repositories\TemporaryMembers;

use App\Models\TemporaryMember;
use Carbon\Carbon;

/**
 * temporary_membersテーブルリポジトリ定義
 *
 * @package   App\Repositories\TemporaryMembers
 * @version   1.0
 */
class TemporaryMembersRepositoryImpl implements ITemporaryMembersRepository
{
    /**
     * {@inheritdoc}
     */
    public function findById($id): ?TemporaryMember
    {
        return TemporaryMember::find($id);
    }
    /**
     * {@inheritdoc}
     */
    public function findByPropertyCdAndRoomNo(string $propertyCode, string $roomNo): ?TemporaryMember
    {
        return TemporaryMember::whereExists(function ($query) use ($propertyCode) {
            $query->selectRaw('1')
                ->from('properties')
                ->whereColumn('properties.id', 'temporary_members.property_id')
                ->where('properties.code', $propertyCode);
        })
        ->where('room_no', $roomNo)
        ->first();
    }
    /**
     * {@inheritdoc}
     */
    public function authenticated($id): bool
    {
        $temporaryMember = $this->findById($id);
        $temporaryMember->authenticated = Carbon::now();

        return $temporaryMember->save();
    }
}
