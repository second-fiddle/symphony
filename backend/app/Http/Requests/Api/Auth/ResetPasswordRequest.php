<?php

namespace App\Http\Requests\Api\Auth;

use App\Http\Requests\IRequest;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * パスワード再設定処理のRequestクラス
 *
 * @package   App\Http\Requests\Api\Auth
 * @version   1.0
 */
class ResetPasswordRequest extends FormRequest implements IRequest
{
    /**
     * 認証設定
     *
     * 画面に参照権限を設ける場合に使用。
     * これを使用しない場合はtrueを固定で返してください
     *
     * @access public
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    /**
     * バリデーションルール
     *
     * @return array バリデーションルール
     */
    public function rules()
    {
        return [
            'email' => [
                'required',
                'email',
                Rule::exists('members', 'email')
                    ->whereNotNull('email_verified_at')
                    ->withoutTrashed()
            ],
        ];
    }
    /**
     * クライアントから受け付けるリクエストパラメータを返す。
     *
     * @access public
     * @return array|null
     */
    public function getParams(): ?array
    {
        return $this->only(['email']);
    }
}
