define([
    'app',
    'marionette',
], function (
    App,
    Marionette
) {
    App.Behaviors.LoadStyles = Marionette.Behavior.extend({
        onRender: function() {
            this.$('[data-style]').each(function (elem) {
                var styleLink = elem.data('style');
                App.helper.loadCSS(styleLink);
            })
        }
    });

    return App.Behaviors.LoadStyles;
});