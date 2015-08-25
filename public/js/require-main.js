requirejs.config({
    baseUrl: 'js',
    config: {
        //Set the config for the i18n
        //module ID
        i18n: {
            locale: 'ua-ua'
        }
    },
    paths: {
        backbone: 'vendor/backbone/backbone',
        'backbone.syphon': 'vendor/backbone/backbone.syphon',
        jquery: 'vendor/backbone/jquery',
        marionette: 'vendor/backbone.marionette/backbone.marionette',
        underscore: 'vendor/backbone/underscore',
        bootstrap: 'vendor/bootstrap/bootstrap.min',
        validation: 'vendor/backbone/backbone.validation',
        stickit: 'vendor/backbone/backbone.stickit',
        text: 'vendor/require/text',
        tpl: 'vendor/backbone/underscore-tpl',
        syphon: 'vendor/backbone/backbone.syphon',
        select2: 'vendor/select2/select2',
        paginator: 'vendor/backbone.paginator/backbone.paginator',
        ckeditor: 'vendor/ckeditor/ckeditor',
        'ckeditor.custom.settings': 'vendor/ckeditor/custom-instance-settings',
        'ckeditor.adapter': 'vendor/ckeditor/adapters/jquery',
        'highlight': 'vendor/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack',
        'moment': 'vendor/moment/moment-with-locales.min',
        'wampy': 'vendor/wampy/wampy-all.min',
        'progressbar': 'vendor/progressbar/progressbar.min',
        i18next: 'vendor/i18next-1.10.1/i18next-1.10.1.min'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'backbone.syphon': ['backbone'],
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        bootstrap: ['jquery'],
        validation: ['backbone'],
        tpl: ['text'],
        syphon: ['backbone'],
        'ckeditor.adapter': ['ckeditor']
    }
});

require(['app', 'i18next'], function (App) {
    // App in i18next context for inserting _t() helper inside the all templates
    var i18nOptions = {
        useCookie: true,
        detectFromHeaders: true,
        fallbackLang: 'en',
        resGetPath: 'js/locales/__lng__.json'
    };

    i18n.init(i18nOptions, function (t) {
            App.start({
                codeSnippetTheme: 'github',
                websocketPort: 9092
            });
        }
    );
});