<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

use App\Enums\MessageDefine;

/**
 * アプリケーション例外ハンドラー
 */
class AppExceptionHandler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Exception
     */
    public function render($request, Exception $exception)
    {
        // ajax判定
        if ($request->ajax()) {
            $status = 400;
            // HTTP系例外が発生した場合
            if ($this->isHttpException($exception)) {
                $status = $exception->getStatusCode();
            }
            // Responsableインターフェースを継承したクラスはここでレスポンスを返す
            if ($exception instanceof ApplicationException) {
                return $this->toResponse($request, $exception->getMessage(), $exception->getCode());
            } else if ($exception instanceof ValidationException) {
                return $this->toResponse($request, $exception->errors(), 400);
            }
            // それ以外の場合は Internal Server Error とする
            return $this->toResponse($request, MessageDefine::E_BCCM00_0001, Response::HTTP_INTERNAL_SERVER_ERROR);
        } else {
            return parent::render($request, $exception);
        }
    }
    /**
     * レスポンスを生成する。
     * @param Request $request
     * @param string|array $message
     * @param int $statusCode
     */
    protected function toResponse($request, $message, int $statusCode)
    {
        return response()->json([
            'message' => $message,
            'status'  => $statusCode,
            'url'     => $request->path()
        ], $statusCode);
    }
}
