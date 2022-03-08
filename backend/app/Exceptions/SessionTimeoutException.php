<?php

namespace App\Exceptions;

use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * セッションタイムアウト例外
 *
 * @package   App\Exceptions
 * @version   1.0
 */
class SessionTimeoutException extends ApplicationException
{
    /**
     * コンストラクタ
     *
     * @access public
     * @param int $statusCode ステータスコード
     * @param Throwable $exception 発生例外
     * @return void
     */
    public function __construct(Throwable $exception)
    {
        parent::__construct($exception->getMessage(), Response::HTTP_REQUEST_TIMEOUT, $exception);
    }
}
