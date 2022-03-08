<?php

namespace App\Models;

use App\Models\Traits\AuthenticationModel;
use App\Models\Traits\CamelcaseJson;
use App\Notifications\VerifyNotification;
use App\Notifications\PasswordResetNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * 会員モデル
 *
 * @package   App\Models
 * @version   1.0
 */
class Member extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens,
        HasFactory,
        Notifiable,
        SoftDeletes,
        CamelcaseJson,
        AuthenticationModel;

    /**
     * The attributes that are mass assignable.
     *
     * @access protected
     * @var string[]
     */
    protected $fillable  = [
        'last_name',
        'first_name',
        'last_name_ruby',
        'first_name_ruby',
        'tel1',
        'tel2',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @access protected
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @access protected
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    /**
     * Send the email verification notification.
     *
     * @access public
     * @return void
     */
    public function sendEmailVerificationNotificationEx($memberPropertyId)
    {
        $this->notify(new VerifyNotification($memberPropertyId));
    }
    /**
     * Send the email password reset notification.
     *
     * @access public
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new PasswordResetNotification($token));
    }
    /**
     * propertiesテーブルリレーション定義
     *
     * @access public
     * @return BelongsToMany
     */
    public function properties(): BelongsToMany
    {
        return $this->belongsToMany(Property::class, 'member_properties');
    }
}
