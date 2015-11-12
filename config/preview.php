<?php

return [
    'placeholder' => 'https://placeholdit.imgix.net/~text?txtsize=200&txt=No+Preview&w=1024&h=550&txttrack=0',
    'screenshot_width' =>  700, //px
    'screenshot_providers' => [
        App\Services\Preview\Contracts\OEmbedPreviewInterface::class,
        App\Services\Preview\Contracts\OpenGraphPreviewInterface::class,
        App\Services\Preview\Contracts\ScreenshotPreviewInterface::class,
        App\Services\Preview\Contracts\PlaceholderPreviewInterface::class
    ],
    'oembed_providers' => [
        'youtube.com' => 'oembed',
        'www.youtube.com' => 'oembed',
        'vimeo.com' => 'api/oembed.json',
        'dotsub.com' => 'services/oembed',
        'on.aol.com' => 'oembed.json',
        'www.ustream.tv' => 'oembed',
        'www.dailymotion.com' => 'services/oembed',
        'www.flickr.com' => 'services/oembed',
        'www.23hq.com' => '23/oembed',
        'www.slideshare.net' => 'api/oembed/2'
    ]
];
