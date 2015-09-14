define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    App.Behaviors.CodeHighlighter = Marionette.Behavior.extend({
        onShow: function () {
            // Highligting code-snippets
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
        }
    });

    return App.Behaviors.CodeHighlighter;
});