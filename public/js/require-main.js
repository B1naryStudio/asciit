requirejs.config({
    baseUrl: 'js',
    paths: {
        backbone: 'vendor/backbone/backbone',
        'backbone.syphon': 'vendor/backbone/backbone.syphon',
        jquery: 'vendor/backbone/jquery',
        marionette: 'vendor/backbone.marionette/backbone.marionette',
        underscore: 'vendor/backbone/underscore',
        bootstrap: 'vendor/bootstrap/bootstrap.min',
        validation: 'vendor/backbone/backbone.validation',
        stickit: 'vendor/backbone/backbone.stickit.min',
        text: 'vendor/require/text',
        tpl: 'vendor/backbone/underscore-tpl',
        syphon: 'vendor/backbone/backbone.syphon',
        select2: 'vendor/select2/select2',
        paginator: 'vendor/backbone.paginator/backbone.paginator',
        'ckeditor.config': 'vendor/ckeditor/config',
        ckeditor: 'vendor/ckeditor/ckeditor',
        'ckeditor.adapter': 'vendor/ckeditor/adapters/jquery'
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
        'ckeditor.config': ['ckeditor'],
        'ckeditor.adapter': ['ckeditor', 'ckeditor.config']
    }
});

require(['app'], function (App) {
    App.start();
});