@component('mail::message')

<span style="font-weight: bold;">パスワードの再設定ボタンをクリックしてパスワードの設定を行ってください。</span>

@component('mail::button', ['url' => $url])
パスワードの再設定
@endcomponent

<br>

### ※もしこのメールに覚えが無い場合は破棄してください。

---

@if (!empty($url))
##### 「パスワードの再設定」ボタンをクリックできない場合は、下記のURLをコピーしてWebブラウザに貼り付けてください。
##### {{ $url }}
@endif

@endcomponent
