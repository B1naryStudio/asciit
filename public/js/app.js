define(['marionette', 'bootstrap', 'validation-model'], function (Marionette, Auth) {
    var App = new Marionette.Application();

    App.prefix = window.location.pathname.replace(/\/(.*)(\/)/, '$1');
    if (App.prefix === '/') {
        App.prefix = '';
    }

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
            require(['controllers/user'], function (controller) {
                controller.session();
            });
        });
    });

    var sync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        var error = function () {};
        if (options.error) {
            error = options.error;
        }
        options.error = function (xhr, textStatus, errorThrown) {
            if (xhr.status === 401 ) {
                Backbone.history.navigate('/login', { trigger: true });
            } else {
                error(xhr, textStatus, errorThrown);
            }
        };
        return sync(method, model, options);
    };

    return App;
});