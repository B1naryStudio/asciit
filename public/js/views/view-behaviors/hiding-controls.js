define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    App.Behaviors.HidingControls = Marionette.Behavior.extend({
        defaults: {
            controlsContainer: '.entry-controls'
        },

        onOverEntry: function () {
            if (
                this.view.model.isCurrentUserOwner()
                || App.User.Current.isAdmin()
            ) {
                this.$(this.options.controlsContainer).show();
            }
        },

        onOutEntry: function () {
            this.$(this.options.controlsContainer).hide();
        }
    });

    return App.Behaviors.HidingControls;
});