define(['app'], function(App) {
    App.module('Behaviors', function (Behaviors, App, Backbone, Marionette, $, _) {
        Behaviors.WaitingState = Marionette.Behavior.extend({
            onWaitingStart: function () {
                this.$el.css('opacity', 0.5);
            },
            onWaitingDisable: function () {
                this.$el.css('opacity', 1);
            }
        });
    });

    return App.Behaviors.WaitingState;
});
