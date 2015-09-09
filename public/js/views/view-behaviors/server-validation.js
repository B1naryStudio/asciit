define(['app'], function(App) {
    App.module('Behaviors', function (Behaviors, App, Backbone, Marionette, $, _) {
        Behaviors.ServerValidation = Marionette.Behavior.extend({
            onModelInvalid: function (errors) {
                for (var field in errors) {
                    if (!errors.hasOwnProperty(field)) {
                        continue;
                    }
                    Backbone.Validation.callbacks.invalid(
                        this.view,
                        field,
                        errors[field]
                    );
                }
            }
        });
    });

    return App.Behaviors.ServerValidation;
});