<?php

namespace App\Http\Requests\Api\Auth;

use App\Http\Requests\IRequest;
use App\Http\Rules\TelRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * プロフィール登録処理のRequestクラス
 *
 * @package   App\Http\Requests\Api\Auth
 * @version   1.0
 */
class SignupStoreRequest extends FormRequest implements IRequest
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
     * 【必須】
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
            'password'          => ['required', 'min:8', 'confirmed'],
            'nickname'          => ['required', 'max:20'],
            'lastName'          => ['nullable', 'max:20'],
            'firstName'         => ['nullable', 'max:20'],
            'lastNameRuby'      => ['nullable', 'max:40'],
            'firstNameRuby'     => ['nullable', 'max:40'],
            'tel1'              => ['nullable', 'max:13', new TelRule()],
            'tel2'              => ['nullable', 'max:13', new TelRule()],
            'temporaryMemberId' => ['required', 'integer']
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
        return $this->only([
            'email',
            'password',
            'nickname',
            'lastName',
            'firstName',
            'lastNameRuby',
            'firstNameRuby',
            'tel1',
            'tel2',
            'temporaryMemberId'
        ]);
    }
}
