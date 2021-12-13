<?php

namespace App\Exceptions\database;

use App\Enums\MessageDefine;
use App\Exceptions\ApplicationException;

/**
 * 予約例外
 *
 * @category  システム共通
 * @package   App\Exceptions\database
 * @copyright 2020 Intelligent Label Co.ltd. All Rights Reserved.
 * @version   1.0
 */
class SalonStaffReserveLimitOverException extends ApplicationException
{
    /**
     * コンストラクタ
     */
    public function __construct()
    {
        parent::__construct(MessageDefine::E_BCFC02_0005, 400);
    }
}
