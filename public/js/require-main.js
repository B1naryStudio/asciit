requirejs.config({
    baseUrl: jsPath,
    config: {
        //Set the config for the i18n
        //module ID
        i18n: {
            locale: 'ua-ua'
        }
    },
    paths: {
        backbone: 'vendor/backbone/backbone',
        jquery: 'vendor/jquery/jquery',
        'jquery.scroll': 'vendor/jquery/jquery.scrollTo',
        'jquery.elastic': 'vendor/jquery/jquery.elastic.source.antarus66fork',
        'jquery.iframe-resizer': 'vendor/jquery/iframeResizer.min',
        marionette: 'vendor/backbone.marionette/backbone.marionette',
        underscore: 'vendor/backbone/underscore',
        bootstrap: 'vendor/bootstrap/bootstrap',
        validation: 'vendor/backbone/backbone.validation',
        stickit: 'vendor/backbone/backbone.stickit',
        text: 'vendor/require/text',
        tpl: 'vendor/backbone/underscore.tpl',
        syphon: 'vendor/backbone/backbone.syphon',
        select2: 'vendor/select2/select2',
        paginator: 'vendor/backbone/backbone.paginator',
        ckeditor: 'vendor/ckeditor/ckeditor',
        'ckeditor.custom.settings': 'vendor/ckeditor/custom-instance-settings',
        'ckeditor.adapter': 'vendor/ckeditor/adapters/jquery',
        highlight: 'vendor/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack',
        moment: 'vendor/moment/moment-with-locales',
        progressbar: 'vendor/progressbar/progressbar',
        i18next: 'vendor/i18next/i18next-1.10.1',
        updown: 'vendor/updown/updown'
    },
    shim: {
        'ckeditor.adapter': ['ckeditor'],
        i18next: ['jquery'],
        'jquery.elastic': ['jquery']
    }
});

require(['i18next', 'app', 'routes'], function (Lang, App) {
    // App in i18next context for inserting _t() helper inside the all templates
    var i18nOptions = {
        useCookie: true,
        lngWhitelist: ['en-US', 'uk-UA', 'ru-RU'],
        fallbackLang: 'en-US',
        load: 'current',
        resGetPath: 'js/locales/__lng__.json'
    };

    i18n.init(i18nOptions, function (t) {
        App.start({
            codeSnippetTheme: 'github',
            websocketPort: 9092
        });
    });
});