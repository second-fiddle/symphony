<?php
namespace App\Http\Requests;

/**
 * リクエストインターフェイス
 *
 * @package   App\Http\Requests
 * @version   1.0
 */
interface IRequest
{
    /**
     * クライアントから受け付けるリクエストパラメータを返す。
     *
     * @access public
     * @return array|null
     */
    public function getParams(): ?array;
}
