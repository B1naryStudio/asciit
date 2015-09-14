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

        onControlsShow: function () {
            if (
                this.view.model.isCurrentUserOwner()
                || App.User.Current.isAdmin()
            ) {
                this.$(this.options.controlsContainer).show();
            }
        },

        onControlsHide: function () {
            this.$(this.options.controlsContainer).hide();
        }
    });

    return App.Behaviors.HidingControls;
});