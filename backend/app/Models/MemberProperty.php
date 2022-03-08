<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 会員物件モデル
 *
 * @package   App\Models
 * @version   1.0
 */
class MemberProperty extends Model
{
    use HasFactory;

    /**
     * membersテーブルリレーション定義
     *
     * @access public
     * @return BelongsTo
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
    /**
     * propertiesテーブルリレーション定義
     *
     * @access public
     * @return BelongsTo
     */
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
