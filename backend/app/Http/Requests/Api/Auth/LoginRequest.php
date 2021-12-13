<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;

/**
 * 認証処理のRequestクラス
 */
class LoginRequest extends FormRequest
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
  public function authorize() {
    return true;
  }
  /**
   * 【必須】
   * バリデーションルール
   *
   * @return void
   */
  public function rules() {
    return [
      'email' => ['required', 'email'],
      'password' => ['required', 'string'],
    ];
  }
  /**
   * HTTPリクエスト内の項目の見出しを取得する。
   *
   * @return array HTTPリクエスト内の項目の見出し
   */
  public function attributes() {
    return [
      'email' => 'メールアドレス',
    ];
  }
}
