<?php
namespace App\Http\Dtos;

/**
 * DTO インターフェイス
 */
interface IDto
{
    /**
     * 配列変換
     *
     * @access public
     * @return array
     */
    public function toArray(): array;
}
