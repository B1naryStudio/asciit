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
            onDataInvalid: function (errors) {
                $('.error').html('');
                if (!errors) {
                    $('.error.all').html('Something went wrong.');
                } else {
                    for (var i in errors) {
                        if (!errors.hasOwnProperty(i)) {
                            continue;
                        }

                        $('.error.' + i).html(errors[i]);
                    }
                }
            }
        });
    });
    return App.User.Views;
});

