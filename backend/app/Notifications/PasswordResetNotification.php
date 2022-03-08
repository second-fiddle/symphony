<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword;

/**
 * パスワード再設定メール送信
 *
 * @package   App\Notifications
 * @version   1.0
 */
class PasswordResetNotification extends ResetPassword
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @access public
     * @param string $token トークン
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
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
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $this->token);
        }

        $host = config('app.url');
        $url = "{$host}/change-password?token={$this->token}&email={$notifiable->email}";
        return (new MailMessage())
                    ->subject('パスワード設定通知')
                    ->markdown('notifications.emails.reset-password', ['url' => $url]);
    }
}
