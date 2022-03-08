<?php

namespace App\Aspect\Modules;

use App\Aspect\PointCut\TransactionalPointCut;
use App\Aspect\PointCut\PointCutable;

/**
 * Class TransactionalModule
 */
class TransactionalModule extends AspectModule
{
    /**
     * @var array
     */
    protected $classes = [
        ['app/Services' , '*Service*'],
    ];

    /**
     * @return PointCutable
     */
    public function registerPointCut(): PointCutable
    {
        return new TransactionalPointCut;
    }
}
