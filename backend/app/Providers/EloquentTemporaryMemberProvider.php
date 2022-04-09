<?php

namespace App\Providers;

use App\Repositories\TemporaryMembers\Impl\TemporaryMembersRepository;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;

/**
 * メンバーのログイン処理を拡張するプロバイダークラス
 *
 * @package   App\Providers
 * @version   1.0
 */
class EloquentTemporaryMemberProvider extends EloquentUserProvider
{
    /**
     * Create a new database user provider.
     *
     * @access public
     * @param  \Illuminate\Contracts\Hashing\Hasher  $hasher
     * @param  string  $model
     * @return void
     */
    public function __construct(HasherContract $hasher, $model)
    {
        parent::__construct($hasher, $model);
    }
    /**
     * {@inheritdoc}
     */
    public function retrieveByCredentials(array $credentials)
    {
        $temporaryMembersRepository = app()->make(TemporaryMembersRepository::class);
        return $temporaryMembersRepository->findByPropertyCdAndRoomNo($credentials['propertyCd'], $credentials['roomNo']);
    }
}
