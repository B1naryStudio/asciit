define(['marionette', 'bootstrap', 'validation-model'], function (Marionette, Auth) {
    var App = new Marionette.Application();
    App.prefix = 'asciit';

    App.addRegions({
        container: 'body'
    });

    App.addInitializer(function (options) {

        require(['views/main-layout'], function (layout) {
            App.container.show(layout);
        });

    });

    App.on('start', function () {
        ///////
        require(['controllers/user'], function (controller) {
            controller.session({
                success: function() {
                    require(['routes'], function () {
                        if (Backbone.history) {
                            Backbone.history.start();
                        }
                    });
                },
                error: function() {
                    require(['routes'], function () {
                        if (Backbone.history) {
                            Backbone.history.start();
                        }
                    });
                }
            });
        });
        ///////


    });

    return App;
});