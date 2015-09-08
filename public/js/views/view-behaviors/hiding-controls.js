define(['app'], function(App) {
    App.module('Behaviors', function (Behaviors, App, Backbone, Marionette, $, _) {
        Behaviors.HidingControls = Marionette.Behavior.extend({

            defaults: {
                controlsContainer: '.entry-controls'
            },

            onShowControls: function () {
                if (
                    this.view.model.isCurrentUserOwner()
                    || App.User.Current.isAdmin()
                ) {
                    this.$(this.options.controlsContainer).show();
                }
            },

            onHideControls: function () {
                this.$(this.options.controlsContainer).hide();
            }
        }); 
    });

    return App.Behaviors.HidingControls;
});