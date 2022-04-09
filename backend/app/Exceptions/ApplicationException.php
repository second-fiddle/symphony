<?php

namespace App\Exceptions;

use RuntimeException;
use Throwable;

/**
 * アプリケーション例外
 *
 * @package   App\Exceptions
 * @version   1.0
 */
class ApplicationException extends RuntimeException
{
    /**
     * コンストラクタ
     *
     * @access public
     * @param string $message 簡易エラーメッセージ
     * @param int $statusCode ステータスコード
     * @param Throwable $exception 発生例外
     * @return void
     */
    public function __construct(string $message = '', int $statusCode = 500, Throwable $exception = null)
    {
        parent::__construct($message, $statusCode, $exception);
    }
}
