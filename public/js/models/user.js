define(['app'], function (App) {
    App.module('User', function (User, App, Backbone, Marionette, $, _) {
        User.Model = Backbone.Model.extend({
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
            },
            initialize: function () {
                this.urlRoot = App.prefix + '/api/v1/user/login';
            }
        });

        var API = {
            login: function (email, password) {
                var user = new User.Model();
                var defer = $.Deferred();
                if (!user.save({
                    email: email,
                    password: password
                }, {
                    wait: true,
                    success: function (data) {
                        defer.resolve(user);
                    },
                    error: function (data) {
                        defer.reject(data.validationError);
                    }
                })) {
                    defer.reject(user.validationError);
                }
                return defer.promise();
            },
        };

        App.reqres.setHandler('user:login', function (email, password) {
            return API.login(email, password);
        });

    });
});
