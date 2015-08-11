define([
    'marionette',
    'bootstrap',
    'validation-model'
], function (Marionette) {
    var App = new Marionette.Application();

    App.prefix = window.location.pathname.replace(/(\/.*)(\/)/, '$1');
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

        App.codeSnippetTheme = options.codeSnippetTheme ?
                               options.codeSnippetTheme :
                               'github';
        // Loading css
        loadCSS('js/vendor/ckeditor/plugins/codesnippet/lib/highlight/styles/' +
        App.codeSnippetTheme + '.css');
    });

    var loadCSS = function(href) {
        var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
        $("head").append(cssLink);
    };

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