define([
    'app',
    'views/view-behaviors/waiting-state',
    'views/view-behaviors/confirm-popup',
], function(App, WaitingState, ConfirmationPopup) {
    App.module('Behaviors', function (Behaviors, App, Backbone, Marionette, $, _) {
        Behaviors.DeleteButton = Marionette.Behavior.extend({
            defaults: {
                'confirmation': true,
                'itemArea': ""
            },

            behaviors: {
                WaitingState: {
                    behaviorClass: WaitingState
                },
                ConfirmationPopup: {
                    behaviorClass: ConfirmationPopup,
                    actionName:   "delete:perform"
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

            onDeletePerform: function () {
                this.view.triggerMethod('waiting:start');
                this.view.trigger('submit:delete', this.view.model);
            },

            onDeleteError: function (errors) {
                this.view.triggerMethod('waiting:stop');

                var messageBlock = this.view.$(
                    this.options.itemArea + ' .error-block'
                );
                messageBlock.html(errors.error).removeClass('hidden');

                setTimeout(function () {
                    messageBlock.addClass('hidden');
                }, 3000)

            }
        });
    });

    return App.Behaviors.DeleteButton;
});