<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Http\Requests\IRequest;
use App\Http\Rules\NicknameRule;
use App\Http\Rules\TelRule;

/**
 * プロフィール入力処理のRequestクラス
 *
 * @package   App\Http\Requests\Api\Auth
 * @version   1.0
 */
class SignupProfileRequest extends FormRequest implements IRequest
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
     * @access public
     * @return array バリデーションルール
     */
    public function rules()
    {
        return [
            'email' => [
                'required',
                'email',
                'max:256',
                Rule::unique('members', 'email')
                    ->whereNotNull('email_verified_at')
                    ->whereNull('deleted_at')
            ],
            'password' => ['required', 'min:8', 'confirmed'],
            'nickname' => [
                'required',
                'max:20',
                new NicknameRule($this->input('temporaryMemberId')),
            ],
            'lastName' => ['nullable', 'max:20'],
            'firstName' => ['nullable', 'max:20'],
            'lastNameRuby' => ['nullable', 'max:40'],
            'firstNameRuby' => ['nullable', 'max:40'],
            'tel1' => ['nullable', 'max:13', new TelRule()],
            'tel2' => ['nullable', 'max:13', new TelRule()],
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
        return null;
    }
}
