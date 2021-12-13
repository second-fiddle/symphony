<?php
namespace App\Models;

use Illuminate\Support\Str;

/**
 * Class CamelModel.
 *
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
trait CamelModelTrait
{
    public function getAttribute($key)
    {
        return parent::getAttribute(Str::snake($key));
    }

    public function setAttribute($key, $value)
    {
        return parent::setAttribute(Str::snake($key), $value);
    }
}
