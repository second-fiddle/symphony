<?php

namespace App\Models;

use App\Models\Traits\AuthenticationModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Traits\CamelcaseJson;
use Laravel\Sanctum\HasApiTokens;

/**
 * 仮会員モデル
 *
 * @package   App\Models
 * @version   1.0
 */
class TemporaryMember extends Authenticatable
{
    use HasApiTokens, HasFactory, CamelcaseJson, AuthenticationModel;

    public $timestamps = false;

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
