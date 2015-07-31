define(['marionette', 'bootstrap', 'validation-model'], function (Marionette, Regions) {
    var App = new Marionette.Application();

    App.addRegions({
        container: 'body'
    });

    App.addInitializer(function (options) {
        layout = require(['views/main-layout']);
        App.container.$el.show(layout);
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