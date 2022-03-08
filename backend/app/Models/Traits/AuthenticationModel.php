<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Hash;

/**
 * 認証モデル基底Traitクラス
 *
 * @package   App\Models\Traits
 * @version   1.0
 */
trait AuthenticationModel
{
    /**
     * 適用されているgurad名を取得する。
     *
     * @access public
     * @return string|null gurad名
     */
    public function activeGuard(): ?string
    {
        foreach (array_keys(config('auth.guards')) as $guard) {
            if (auth()->guard($guard)->check()) {
                return $guard;
            }
        }

        return null;
    }
    /**
     * Set password attributes
     *
     * @access public
     * @param string $password パスワード
     * @return void
     */
    public function setPasswordAttribute($password)
    {
        if ($password) {
            $this->attributes['password'] = Hash::make($password);
        } else {
            unset($this->attributes['password']);
        }
    }
    /**
     * 認証トークンを作成し、プレーンテキストで返す。
     *
     * @access public
     * @param string $tokenName 作成するトークン名
     * @return string 作成したトークン
     */
    public function createPlainTextToken(string $tokenName): string
    {
        // ※古いトークン削除&新しいトークン生成
        $this->tokens()->where('name', "{$tokenName}-{$this->id}")->delete();

        return $this->createToken($tokenName)->plainTextToken;
    }
}
