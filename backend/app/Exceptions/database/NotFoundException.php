<?php

namespace App\Exceptions\database;

use App\Enums\MessageDefine;
use App\Exceptions\ApplicationException;

/**
 * 該当データなし例外
 *
 * @category  システム共通
 * @package   App\Exceptions\database
 * @copyright 2020 Intelligent Label Co.ltd. All Rights Reserved.
 * @version   1.0
 */
class NotFoundException extends ApplicationException
{
    /**
     * コンストラクタ
     */
    public function __construct()
    {
        parent::__construct(MessageDefine::E_BCCM00_0018, 400);
    }
}
