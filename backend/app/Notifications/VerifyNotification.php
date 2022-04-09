<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;

/**
 * メール認証メール送信
 *
 * @package   App\Notifications
 * @version   1.0
 */
class VerifyNotification extends Notification
{
    use Queueable;

    /**
     * 会員物件ID
     *
     * @access private
     * @var integer
     */
    private $memberPropertyId;

    /**
     * コンストラクタ
     *
     * @access public
     * @param integer $memberPropertyId 会員物件ID
     * @return void
     */
    public function __construct($memberPropertyId)
    {
        $this->memberPropertyId = $memberPropertyId;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @access public
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @access public
     * @param  mixed  $notifiable 会員モデル
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = $this->verificationUrl($notifiable);
        return (new MailMessage)
                    ->subject('登録確認メール')
                    ->markdown('notifications.emails.verifyemail', ['url' => $url, 'user' => $notifiable]);
    }
    /**
     * リンク先を作成する。
     *
     * @access public
     * @param mixed  $notifiable 会員モデル
     * @return string メール認証URL
     */
    protected function verificationUrl($notifiable): string
    {
        $url = URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                // 'memberId' => $notifiable->getKey(),
                'id' => $this->memberPropertyId,
                'hash' => sha1($notifiable->getEmailForVerification()),
            ]
        );
        $url = urlencode($url);
        $host = config('app.url');

        return "{$host}/verify/?email_verify_url={$url}";
    }
}
