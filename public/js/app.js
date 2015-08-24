define([
    'marionette',
    'bootstrap',
    'validation-model'
], function (Marionette) {
    var App = new Marionette.Application();

    App.queryFlag = [];

    App.helper = {
        getSelected: function() {
            if(window.getSelection) { return window.getSelection(); }
            else if(document.getSelection) { return document.getSelection(); }
            else {
                var selection = document.selection && document.selection.createRange();
                if(selection.text) { return selection.text; }
                return false;
            }
            return false;
        },

        moveFocus: function(editor, data) {

            var checkData = editor.getData();
            var el = $(editor.getSelection().document.$).find('body');
            if(checkData!='') {
                el.append('<p></p>');
                el.find('p:last').append(data);
            } else {
                el.find('p:last').html(data);
            }
            var s = editor.getSelection(); // getting selection
            var selected_ranges = s.getRanges(); // getting ranges

            var node = selected_ranges[0].startContainer; // selecting the starting node
            var parents = node.getParents(true);
            node = parents[parents.length - 2].getFirst();
            while (true) {
                var x = node.getNext();
                if (x == null) {
                    break;
                }
                node = x;
            }
            s.selectElement(node);
            selected_ranges = s.getRanges();
            selected_ranges[0].collapse(false);  //  false collapses the range to the end of the selected node, true before the node.
            s.selectRanges(selected_ranges);
        },

        controllButtons: function(el, option) {
            $(el).find('[name="title"]').attr('disabled', option);
            $(el).find('.control-buttons').toggle();
            $(el).find('.edit-buttons').toggle();
        }
    };

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

        App.websocketPort = options.websocketPort ?
                            options.websocketPort :
                            9090;
        // Loading css for codesnippets highlighting
        loadCSS('js/vendor/ckeditor/plugins/codesnippet/lib/highlight/styles/' +
            App.codeSnippetTheme + '.css');

        overwriteRenderer();
    });


    function overwriteRenderer() {
        // Simply use a closure to close over the current render function
        var render = Marionette.Renderer.render;

        // Then override it
        Marionette.Renderer.render = function (template, data){

            // Extend data to inject our translate helper
            data = _.extend(data, {_t: i18n.t});

            // And finally return the result of calling the original render function
            // With our injected helper
            return render(template, data);
        };
    }

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