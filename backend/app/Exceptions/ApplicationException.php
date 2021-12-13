<?php

namespace App\Exceptions;

use RuntimeException;

/**
 * アプリケーション例外
 */
class ApplicationException extends RuntimeException
{
    /**
     * コンストラクタ
     *
     * @param string $message 簡易エラーメッセージ
     * @param int $statusCode ステータスコード
     * @param Throwable $exception 発生例外
     */
    public function __construct(string $message = '', int $statusCode = 500, Throwable $exception = null)
    {
        parent::__construct($message, $statusCode, $exception);
    }
}
