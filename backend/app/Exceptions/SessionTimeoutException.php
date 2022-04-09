<?php

namespace App\Exceptions;

use RuntimeException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * セッションタイムアウト例外
 *
 * @package   App\Exceptions
 * @version   1.0
 */
class SessionTimeoutException extends RuntimeException
{
    /**
     * コンストラクタ
     *
     * @access public
     * @param int $statusCode ステータスコード
     * @param Throwable $exception 発生例外
     * @return void
     */
    public function __construct(Throwable $exception = null)
    {
        $message = $exception ? $exception->getMessage() : 'session timeout';
        parent::__construct($message, Response::HTTP_REQUEST_TIMEOUT, $exception);
    }
}
