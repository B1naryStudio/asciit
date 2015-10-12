<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class PreviewProvider extends ServiceProvider
{
    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            'App\Services\Preview\Contracts\OpenGraphPreviewInterface',
            'App\Services\Preview\OpenGraphPreview'
        );

        $this->app->singleton(
            'App\Services\Preview\Contracts\OEmbedPreviewInterface',
            'App\Services\Preview\OEmbedPreview'
        );

        $this->app->singleton(
            'App\Services\Preview\Contracts\ScreenshotPreviewInterface',
            'App\Services\Preview\ScreenshotPreview'
        );

        $this->app->singleton(
            'App\Services\Preview\Contracts\PlaceholderPreviewInterface',
            'App\Services\Preview\PlaceholderPreview'
        );

        $this->app->singleton(
            'App\Services\Preview\Contracts\PreviewServiceInterface',
            'App\Services\Preview\PreviewService'
        );

        $configPath = __DIR__ . '/../../config/preview.php';
        $this->mergeConfigFrom($configPath, 'preview');
    }

    public function boot ()
    {
        $this->publishes([
            __DIR__ . '/../../config/preview.php' => config_path('preview.php'),
        ]);
    }
}
