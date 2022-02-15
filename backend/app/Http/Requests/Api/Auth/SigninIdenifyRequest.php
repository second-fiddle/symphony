<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Http\Rules\Members\EmailExistsRule;

/**
 * 本人確認処理のRequestクラス
 */
class SigninIdenifyRequest extends FormRequest
{
    /**
     * 【必須】
     * 認証設定
     *
     * 画面に参照権限を設ける場合に使用。
     * これを使用しない場合はtrueを固定で返してください
     *
     * @return void
     */
    public function authorize()
    {
        return true;
    }
    /**
     * 【必須】
     * バリデーションルール
     *
     * @return void
     */
    public function rules()
    {
        $union_cd = $this->request->get('unionCd');
        return [
          'unionCd'  => ['required', Rule::exists('unions', 'code')->withoutTrashed()],
          'email'    => ['required', 'email', new EmailExistsRule($union_cd)],
          'password' => ['required', 'string'],
        ];
    }
}
