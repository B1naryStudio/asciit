define(['app'], function (App) {
    App.module('FormView', function (FormView, App, Backbone, Marionette, $, _) {
        FormView.view = Marionette.ItemView.extend({
            ui: {
                'submit': '.submit-btn'
            },
            events: {
                'click @ui.submit': 'submitForm'
            },
            submitForm: function (e) {
                e.preventDefault();
                if(this.model.isValid(true)) {
                    this.saveSuccess = function () {
                        console.log('Model was saved');
                        App.router.navigate(this.redirectPath, {trigger: true});
                    };

                    this.saveError = function (model, xhr, options) {
                        var errors = JSON.parse(xhr.responseText);

                        for (var field in errors) {
                            if (!errors.hasOwnProperty(field)) {
                                continue;
                            }
                            console.log('Error in ' + field + ': ' + errors[field] );
                            Backbone.Validation.callbacks.invalid(this, field, errors[field]);
                        }
                    };

                    this.model.save([],{
                        success: this.saveSuccess,
                        error: this.saveError
                    });
                }
            },

            onRender: function() {
                this.stickit();
                return this;
            },

            remove: function() {
                // Remove the validation binding
                // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
                Backbone.Validation.unbind(this);
                return Backbone.View.prototype.remove.apply(this, arguments);
            }
        });
    });
    return App.FormView.view;
});