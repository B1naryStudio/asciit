define([
    'app',
    'marionette',
    'jquery.ajax-gist'
], function (
    App,
    Marionette
) {
    App.Behaviors.GistSnippet = Marionette.Behavior.extend({
        onRender: function() {
            this.$('div[data-gist]').ajaxgist();
        }
    });

    return App.Behaviors.GistSnippet;
});