define(['app'], function(App) {
    App.module('Behaviors', function (Behaviors, App, Backbone, Marionette, $, _) {
        Behaviors.CodeHighlighter = Marionette.Behavior.extend({
            onShow: function () {
                // Highligting code-snippets
                $('pre code').each(function (i, block) {
                    hljs.highlightBlock(block);
                });
            }
        });
    });

    return App.Behaviors.CodeHighlighter;
});