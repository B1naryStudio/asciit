define(['app', 'ckeditor.custom.settings'], function(App, EditorSettings) {
    App.module('Behaviors', function (Behaviors, App, Backbone, Marionette, $, _) {
        Behaviors.EditButton = Marionette.Behavior.extend({
            defaults: {
                controlsContainer: '.entry-controls'
            },

            onEditStart: function () {
                this.showEditingControls();
            },

            onEditCancel: function () {
                this.hideEditingControls();
            },

            onModelUpdated: function () {
                this.hideEditingControls();
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