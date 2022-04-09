<?php

namespace App\Exceptions;

use App\Helpers\Message;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * メール認証例外
 *
 * @package   App\Exceptions
 * @version   1.0
 */
class VerificationExpiredException extends ApplicationException
{
    /**
     * コンストラクタ
     *
     * @access public
     * @param int $statusCode ステータスコード
     * @param Throwable $exception 発生例外
     * @return void
     */
    public function __construct(int $statusCode = Response::HTTP_UNAUTHORIZED, Throwable $exception = null)
    {
        $message = Message::getMessage('messages.E.verification.expired');
        parent::__construct($message, $statusCode, $exception);
    }
}
