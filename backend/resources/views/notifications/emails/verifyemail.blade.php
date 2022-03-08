@component('mail::message')

<span style="font-weight: bold;">以下の認証リンクをクリックしてください。</span>

@component('mail::button', ['url' => $url])
本登録を完了する
@endcomponent

### ※もしこのメールに覚えが無い場合は破棄してください。

---

@if (!empty($url))
##### 「本登録を完了する」ボタンをクリックできない場合は、下記のURLをコピーしてWebブラウザに貼り付けてください。
##### {{ $url }}
@endif

@endcomponent
