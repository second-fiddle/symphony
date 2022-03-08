<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * 物件モデル
 *
 * @package   App\Models
 * @version   1.0
 */
class Property extends Model
{
    use HasFactory;

    /**
     * membersテーブルリレーション定義
     *
     * @access public
     * @return BelongsToMany
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(Member::class, 'member_properties', 'property_id', 'id');
    }
}
