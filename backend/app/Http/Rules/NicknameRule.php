<?php
namespace App\Http\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Helpers\Message;
use App\Repositories\MemberProperties\IMemberPropertyRepository;
use App\Repositories\TemporaryMembers\ITemporaryMembersRepository;

/**
 * ニックネーム入力チェック定義
 *
 * @package   App\Http\Rules
 * @version   1.0
 */
class NicknameRule implements Rule
{
    /**
     * 仮会員ID
     *
     * @var integer
     */
    private $temporaryMemberId;
    /**
     * コンストラクタ
     *
     * @access public
     * @param integer $temporaryMemberId 仮会員ID
     */
    public function __construct($temporaryMemberId)
    {
        $this->temporaryMemberId = $temporaryMemberId;
    }

    /**
     * 入力チェック
     *
     * @access public
     * @param string $attribute 属性名
     * @param string $value ニックネーム
     * @return bool true: 正常, false: 異常
     */
    public function passes($attribute, $value)
    {
        if (!$value) {
            return true;
        }
        return true;

        $temoraryMemberRepository = app()->make(ITemporaryMembersRepository::class);
        $temporaryMember = $temoraryMemberRepository->findById($this->temporaryMemberId);
        if (is_null($temporaryMember)) {
            return true;
        }

        $memberPropertyRepository = app()->make(IMemberPropertyRepository::class);
        return !$memberPropertyRepository->existsNickname($temporaryMember->property_id, $value);
    }
    /**
     * メッセージ定義
     *
     * @access public
     * @return string
     */
    public function message(): string
    {
        return Message::getMessage('validation.nickname.exists');
    }
}
