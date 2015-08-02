define(['app'], function (App) {
    App.module('User', function (User, App, Backbone, Marionette, $, _) {
        User.Model = Backbone.Model.extend({
            urlRoot: '/user/login',
            defaults: {
                email: '',
                password: ''
            },
            validation: {
                email: {
                    required: true,
                    pattern: 'email',
                    msg: 'You entered invalid email address'
                },
                password: {
                    required: true,
                    msg: 'Please enter your password'
                }
            }
        });

        var API = {
            login: function (email, password) {
                var user = new User.Model();
                var defer = $.Deferred();
                debugger;
                if (!user.save({
                    email: email,
                    password: password
                }, {
                    wait: true,
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        defer.reject(data.validationError);
                    }
                })) {
                    defer.reject(user.validationError);
                }
                return defer.promise();
            }
        };

        App.reqres.setHandler('user:login', function (email, password) {
            return API.login(email, password);
        });
    });
});
