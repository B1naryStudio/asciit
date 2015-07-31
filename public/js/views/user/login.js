define(['app', 'views/form', 'tpl!views/templates/user/login.tpl', 'syphon'], function (App, FormView, EditTpl) {
    App.module('User.Views', function (View, App, Backbone, Marionette, $, _) {
        View.UserLoginForm = FormView.extend({
            tagName: 'div',
            template: EditTpl,
            redirectPath: '/',
            bindings: {
                '[name=login]': {
                    observe: 'login',
                    setOptions: {
                        validate: true
                    }
                },
                '[name=password]': {
                    observe: 'password',
                    setOptions: {
                        validate: true
                    }
                }
            },
            initialize: function (options) {
                this.model = new App.User.Model();
                Backbone.Validation.bind(this);
            },
            events: {
                'submit form': 'submit'
            },
            submit: function (event) {
                event.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', data);
            },
            onDataInvalid: function (errors) {
                // TODO: display errors
            }
        });
    });
    return App.User.Views;
});

