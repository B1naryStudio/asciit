define([
    'app',
    'marionette',
    'jquery.ajax-gist'
], function (
    App,
    Marionette
) {
    App.Behaviors.LoadStyles = Marionette.Behavior.extend({
        onRender: function() {
            this.$('div[data-style]').ajaxgist();
        }
    });

    return App.Behaviors.LoadStyles;
});