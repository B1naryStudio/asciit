define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    App.Behaviors.WaitingState = Marionette.Behavior.extend({
        onWaitingStart: function () {
            this.$el.css('opacity', 0.5);
        },
        onWaitingStop: function () {
            this.$el.css('opacity', 1);
        }
    });

    return App.Behaviors.WaitingState;
});
