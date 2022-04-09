<?php

namespace App\Providers;

use App\Models\PersonalAccessToken;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\Finder\Finder;

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
        $dirs = [
            'Services',
            'Repositories'
        ];
        foreach ($dirs as $dir) {
            $this->bind($dir);
        }
    }
    /**
     * bindを行う
     *
     * @param string $dir 対象のディレクトリ
     * @return void
     */
    private function bind(string $dir)
    {
        $finder = new Finder();
        $iterator = $finder
            ->in(app_path().'/'.$dir)
            ->depth('< 2')
            ->name('I*.php')
            ->files();
        foreach ($iterator as $fileinfo) {
            $filepath = $fileinfo->getPathname();
            list($interface, $impl) = $this->getBinds($filepath);
            if (is_null($impl)) {
                // インターフェイスのみ定義している場合、bindしない
                continue;
            }

            $this->app->bind($interface, $impl);
        }
    }
    /**
     * バインドするインターフェイスと実装クラスのクラスパスを取得する
     *
     * @param string $filepath
     * @return array interface, impl
     */
    private function getBinds(string $filepath): array
    {
        $fileInfo = pathinfo($filepath);

        $interfaceDir      = $fileInfo['dirname'];
        $interfaceFileName = $fileInfo['filename'];
        $interfacePath     = "{$interfaceDir}/{$interfaceFileName}";
        $interfaceClass    = Str::replace(app_path(), 'App', $interfacePath);
        $interfaceClass    = Str::replace('/', '\\', $interfaceClass);

        $implDir      = "{$interfaceDir}/Impl";
        $implFileName = substr($interfaceFileName, 1);
        $implFilePath = "{$implDir}/{$implFileName}";
        $implFIlePathWithExtention = "{$implFilePath}.{$fileInfo['extension']}";
        $implClass    = Str::replace(app_path(), 'App', $implFilePath);
        $implClass    = Str::replace('/', '\\', $implClass);

        $implClass = File::exists($implFIlePathWithExtention) ? $implClass : null;

        return [$interfaceClass, $implClass];
    }
    /**
     * {@inheritdoc}
     */
    public function boot(UrlGenerator $url)
    {
        // Sanctuom PersonalAccessTokenモデル置き換え
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
