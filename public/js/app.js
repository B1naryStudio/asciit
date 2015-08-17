define([
    'marionette',
    'bootstrap',
    'validation-model'
], function (Marionette) {
    var App = new Marionette.Application();

    App.queryFlag = [];

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
        var cssLink = $('<link rel="stylesheet" type="text/css" href="' + href + '">');
        $('head').append(cssLink);
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
        App.queryFlag.push(true);
        var error = function () {};
        var success = function () {};
        if (options.error) {
            error = options.error;
        }
        options.error = function (xhr, textStatus, errorThrown) {
            App.queryFlag.pop();
            App.trigger('spinner:check');
            if (xhr.status === 401 ) {
                Backbone.history.navigate('/login', { trigger: true });
            } else {
                error(xhr, textStatus, errorThrown);
            }
        };
        if (options.success) {
            success = options.success;
        }
        options.success = function (resp) {
            App.queryFlag.pop();
            App.trigger('spinner:check');
            success(resp);
        };
        return sync(method, model, options);
    };

    return App;
});