<?php

namespace App\Providers;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;

/**
 * メンバーのログイン処理を拡張するプロバイダークラス
 *
 * @package   App\Providers
 * @version   1.0
 */
class EloquentMemberProvider extends EloquentUserProvider
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
}
