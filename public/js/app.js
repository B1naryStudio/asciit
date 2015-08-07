define(['marionette', 'bootstrap', 'validation-model'], function (Marionette) {
    var App = new Marionette.Application();

    App.prefix = window.location.pathname.replace(/\/(.*)(\/)*/, '$1');

    App.addRegions({
        container: 'body'
    });

    App.addInitializer(function (options) {
        require(['views/main-layout'], function (layout) {
            App.container.show(layout);
        });
    });

    App.on('start', function () {
        require(['routes'], function () {
            if (Backbone.history) {
                Backbone.history.start();
            }
        });
    });

    return App;
});