define([
    'app',
    'views/view-behaviors/waiting-state',
], function(App, WaitingState) {
    App.module('Behaviors', function (Behaviors, App, Backbone, Marionette, $, _) {
        Behaviors.EditButton = Marionette.Behavior.extend({
            defaults: {
                controlsContainer: '.entry-controls'
            },

            behaviors: {
                WaitingState: {
                    behaviorClass: WaitingState
                }
            },

            onEditStart: function () {
                this.showEditingControls();
            },

            onEditCancel: function () {
                this.hideEditingControls();
            },

            onSubmitUpdate: function () {
                this.view.triggerMethod('waiting:start');
            },

            onModelUpdated: function () {
                this.hideEditingControls();
                this.view.triggerMethod('waiting:stop');

            },

            onModelInvalid: function () {
                this.view.triggerMethod('waiting:stop');
            },

            // hides all buttons in container, shows save and cancel buttons
            showEditingControls: function () {
                this.$(this.options.controlsContainer + " .control").hide();
                this.ui.saveButton.show();
                this.ui.cancelButton.show();
                this.$('.editing-form-group').toggleClass('form-group');
            },

            hideEditingControls: function () {
                this.$(this.options.controlsContainer + " .control").show();
                this.ui.saveButton.hide();
                this.ui.cancelButton.hide();
                this.$('.editing-form-group').toggleClass('form-group');

            }
        });
    });

    return App.Behaviors.EditButton;
});