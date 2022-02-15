<?php

namespace App\Http\Rules\Members;

use Illuminate\Contracts\Validation\Rule;
use App\Helpers\Utils\SystemHelper;
use App\Models\Member;

/**
 * メールアドレス存在チェックルールを定義
 *
 * @package App\Http\Rules
 */
class EmailExistsRule implements Rule
{
    private $unionCd;

    /**
     * コンストラクタ
     *
     * @param string $unionCd 組織コード
     */
    public function __construct($unionCd)
    {
        $this->unionCd = $unionCd;
    }

    /**
     * メールアドレスが存在するか判定する。
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $_this = $this;
        $count = Member::where(['email' => $value])
                       ->join('unions', function ($join) use ($_this) {
                           $join->on('unions.id', '=', 'members.union_id')
                                ->where('unions.code', $_this->unionCd);
                       })
                       ->count();
        return $count === 1;
    }

    /**
     * バリデーションエラーメッセージの取得
     *
     * @return string
     */
    public function message()
    {
        return SystemHelper::getMessage('messages.E.autherror');
    }
}
