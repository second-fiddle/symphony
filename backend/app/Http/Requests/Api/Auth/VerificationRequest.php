<?php

namespace App\Http\Requests\Api\Auth;

use App\Exceptions\VerificationExpiredException;
use Illuminate\Foundation\Http\FormRequest;

/**
 * メール認証処理のRequestクラス
 *
 * @package   App\Http\Requests\Api\Auth
 * @version   1.0
 */
class VerificationRequest extends FormRequest
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
        if (!$this->hasValidSignature()) {
            throw new VerificationExpiredException();
        }

        return [];
    }
}
