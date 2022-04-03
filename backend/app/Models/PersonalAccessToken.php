<?php

namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

/**
 * 物件モデル
 *
 * @package   App\Models
 * @version   1.0
 */
class PersonalAccessToken extends SanctumPersonalAccessToken
{
    /**
     * アクセストークンの有効期限が失効しているかチェックする
     *
     * @return bool
     */
    public function isExpiredToken()
    {
        $expiration = config('sanctum.expiration');
        if (!$expiration || $expiration <= 0) {
            // 未設定、0以下の場合、常に有効扱い
            return false;
        }

        $limit = $this->last_used_at->addMinutes($expiration);
        return $limit->lte(now());
    }
}
