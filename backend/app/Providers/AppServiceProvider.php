<?php

namespace App\Providers;

use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

use App\Services\AppConfigService;

/**
 * Class AppServiceProvider
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * {@inheritdoc}
     */
    public function register()
    {
        $serviceDirs = ['/Services/I*.php','/Services/**/I*.php'];
        foreach ($serviceDirs as $dir) {
            foreach (glob(app_path().$dir) as $filepath) {
                if (Str::endsWith($filepath, 'Impl.php')) {
                    continue;
                }
                list($interface, $clazz) = $this->getBinds($filepath);
                $this->app->bind($interface, $clazz);
            }
        }
        $repositoryInterfaceDirs = ['/Repositories/I*.php','/Repositories/**/I*.php'];
        foreach ($repositoryInterfaceDirs as $dir) {
            foreach (glob(app_path().$dir) as $filepath) {
                if (Str::endsWith($filepath, 'Impl.php')) {
                    continue;
                }
                list($interface, $clazz) = $this->getBinds($filepath);
                $this->app->bind($interface, $clazz);
            }
        }

        $this->app->singleton('AppConfigService', function () {
            return new AppConfigService();
        });
    }
    /**
     * バインドするパスを取得する
     *
     * @param string $filepath
     * @return array interface, clazz
     */
    private function getBinds(string $filepath): array
    {
        $fileInfo = pathinfo($filepath);
        $namespace = Str::replace(app_path(), 'App', $fileInfo['dirname']);
        $namespace = Str::replace('/', '\\', $namespace);
        $interface = "{$namespace}\\{$fileInfo['filename']}";
        $clazz = substr($fileInfo['filename'], 1).'Impl';
        $clazz = "{$namespace}\\{$clazz}";

        return [$interface, $clazz];
    }
    /**
     * {@inheritdoc}
     */
    public function boot(UrlGenerator $url)
    {
        if (app()->isProduction()) {
            $url->forceScheme('https');
        }

        // 商用環境以外だった場合、SQLログを出力する
        if (!app()->isProduction()) {
            DB::listen(function ($query) {
                $sql = $query->sql;
                for ($i = 0; $i < count($query->bindings); $i++) {
                    $value = $query->bindings[$i];
                    if (is_object($value) && get_class($value) === 'DateTime') {
                        $value = date_format($value, 'Y-m-d H:i:s');
                    }

                    $sql = preg_replace("/\?/", $value, $sql, 1);
                }
                Log::channel('sql')->debug($sql);
            });
        }
    }
}
