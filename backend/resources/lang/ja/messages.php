<?php

use SebastianBergmann\CodeCoverage\Report\Xml\BuildInformation;

return [
  'E.systemerr' => 'システムエラーが発生しました。',
  'E.inputerr'  => '入力エラーがあります。',
  'E.autherror' => '入力内容に該当するアカウントが見つかりませんでした。\n入力内容を確認してください。',
  'E.temporaryMember.authenticated' => '既に利用登録済みです。',
  // DB
  'E.not.found' => '該当データがありません。',
  'E.optimistick.lock' => '他のユーザーにより更新されました。\n最新のデータを取得して再度実行してください。',
  // パスワード再設定
  'N.reset.password.success'  => 'パスワード再設定用のメールを送信しました。',
  'E.reset.password.failed'   => 'メールの送信に失敗しました。',
  'N.change.password.success' => 'パスワード設定が完了しました。',
  'E.change.password.failed'  => 'パスワード設定に失敗しました。\nパスワード再設定から再度実施してください。',
  // 本人確認
  'E.signup.identify.authenticated' => '既に利用登録が完了しています。',
  // メール認証
  'E.verification.expired' => 'このURLの期限が切れました。\n本人確認が完了していない場合、もう一度最初から操作をやり直してください。',
];
