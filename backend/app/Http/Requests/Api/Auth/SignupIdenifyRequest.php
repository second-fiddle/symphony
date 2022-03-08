<?php

namespace App\Http\Requests\Api\Auth;

use App\Http\Requests\IRequest;
use Illuminate\Foundation\Http\FormRequest;

/**
 * 本人確認処理のRequestクラス
 *
 * @package   App\Http\Requests\Api\Auth
 * @version   1.0
 */
class SignupIdenifyRequest extends FormRequest implements IRequest
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
          'propertyCd' => ['required'],
          'roomNo'     => ['required'],
          'password'   => ['required'],
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
        return $this->only(['propertyCd', 'roomNo', 'password']);
    }
}
