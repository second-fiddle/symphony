<?php

namespace App\Exceptions\database;

use App\Enums\MessageDefine;
use App\Exceptions\ApplicationException;
use App\Helpers\Message;

/**
 * 排他例外
 *
 * @package   App\Exceptions\database
 * @version   1.0
 */
class OptimisticLockException extends ApplicationException
{
    /**
     * コンストラクタ
     *
     * @access public
     * @return void
     */
    public function __construct()
    {
        parent::__construct(Message::getMessage('messages.E.optimistick.lock'), 400);
    }
}
