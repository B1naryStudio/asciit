define([
    'app',
    'views/view-behaviors/waiting-state',
    'views/view-behaviors/confirm-popup',
], function(App, WaitingState, ConfirmationPopup) {
    App.module('Behaviors', function (Behaviors, App, Backbone, Marionette, $, _) {
        Behaviors.DeleteButton = Marionette.Behavior.extend({
            defaults: {
                'confirmation': true
            },

            behaviors: {
                WaitingState: {
                    behaviorClass: WaitingState
                },
                ConfirmationPopup: {
                    behaviorClass: ConfirmationPopup,
                    actionName:   "perform:delete"
                }
            },

            onDelete: function () {
                if (this.options.confirmation) {
                    this.view.triggerMethod('confirm:create', {
                        title: this.options.confirmTitle,
                        body:  this.options.confirmBody
                    });
                } else {
                    this.onPerformDelete();
                }
            },

            onPerformDelete: function () {
                this.view.triggerMethod('waiting:start');
                this.view.trigger('submit:delete', this.view.model);
            }
        });
    });

    return App.Behaviors.DeleteButton;
});