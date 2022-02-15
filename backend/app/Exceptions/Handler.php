<?php

namespace App\Exceptions;

use Exception;
use Throwable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

use App\Helpers\Utils\SystemHelper;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var string[]
     */
    protected $dontReport = [
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
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
     * @return void
     */
    public function register()
    {
        $this->renderable(function (Exception $exception, $request) {
            if ($request->is('api/*')) {
                $status = 400;
                // HTTP系例外が発生した場合
                if ($this->isHttpException($exception)) {
                    $status = $exception->getStatusCode();
                }
                // Responsableインターフェースを継承したクラスはここでレスポンスを返す
                if ($exception instanceof ApplicationException) {
                    return $this->toResponse($exception->getMessage(), $exception->getCode());
                } elseif ($exception instanceof ValidationException) {
                    $errors = $exception->errors();
                    return $this->toResponse(SystemHelper::getMessage('messages.E.inputerr'), $status, $errors);
                }
                // それ以外の場合は Internal Server Error とする
                return $this->toResponse(SystemHelper::getMessage('messages.E.systemerr'), Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        });
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    /**
     * レスポンスを生成する。
     * @param string|array $message
     * @param int $status
     * @param string $details
     */
    protected function toResponse($message, int $status, $details = '')
    {
        return response()->json([
            'status'  => $status,
            'message' => $message,
            'data'    => $details
        ], $status);
    }
}
