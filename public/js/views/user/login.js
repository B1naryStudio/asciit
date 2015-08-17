define([
    'app',
    'views/form',
    'tpl!views/templates/user/login.tpl',
    'syphon'
], function (App, FormView, Tpl) {
    App.module('User.Views', function (View, App, Backbone, Marionette, $, _) {
        View.UserLoginForm = FormView.extend({
            tagName: 'div',
            template: Tpl,
            onDataInvalid: function (errors) {
                $('.error').html('');
                if (!errors) {
                    $('.error.all').html('Wrong login or password');
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
    return App.User.Views.UserLoginForm;
});

