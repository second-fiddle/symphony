<?php

namespace App\Exceptions\database;

use App\Exceptions\ApplicationException;
use App\Helpers\Message;

/**
 * 該当データなし例外
 *
 * @package   App\Exceptions\database
 * @version   1.0
 */
class NotFoundException extends ApplicationException
{
    /**
     * コンストラクタ
     *
     * @access public
     * @return void
     */
    public function __construct()
    {
        parent::__construct(Message::getMessage('messages.E.not.found'), 400);
    }
}
