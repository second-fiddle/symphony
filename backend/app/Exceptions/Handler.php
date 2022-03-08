<?php

namespace App\Exceptions;

use App\Helpers\Message;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Session\TokenMismatchException;
use Throwable;

/**
 * 例外ハンドラー
 *
 * @package   App\Exceptions
 * @version   1.0
 */
class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @access protected
     * @var string[]
     */
    protected $dontReport = [
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @access protected
     * @var string[]
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @access public
     * @return void
     */
    public function register()
    {
        $this->renderable(function (Exception $exception, $request) {
            \Log::debug($exception);
            if ($request->is('api/*')) {
                $status = 400;
                // HTTP系例外が発生した場合
                if ($this->isHttpException($exception)) {
                    $status = $exception->getCode();
                }
                // Responsableインターフェースを継承したクラスはここでレスポンスを返す
                if ($exception instanceof ApplicationException ||
                    $exception instanceof AuthenticationException ||
                    $exception instanceof TokenMismatchException
                ) {
                    \Log::debug("aaaaaaaaaa");
                    return $this->toResponse($exception->getMessage(), $exception->getCode());
                } elseif ($exception instanceof ValidationException) {
                    $errors = $exception->errors();
                    return $this->toResponse(Message::getMessage('messages.E.inputerr'), $status, $errors);
                }
                // それ以外の場合は Internal Server Error とする
                return $this->toResponse(Message::getMessage('messages.E.systemerr'), Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        });
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    /**
     * レスポンスを生成する。
     *
     * @access protected
     * @param string|array $message メッセージ
     * @param int $status httpステータス
     * @param string $data レスポンスデータ
     */
    protected function toResponse($message, int $status, $data = '')
    {
        return response()->json([
            'status'  => $status,
            'message' => $message,
            'data'    => $data
        ], $status);
    }
}
