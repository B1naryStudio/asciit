define(['app'], function (App) {
    App.module('User', function (User, App, Backbone, Marionette, $, _) {
        User.Model = Backbone.Model.extend({
            urlRoot: '/users',
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
            getUser: function (id) {
                var user = new Models.User({ id: id });
                var defer = $.Deferred();
                user.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        defer.resolve(undefined);
                    }
                });
                return defer.promise();
            }
        };

        App.reqres.setHandler('user:model', function (id) {
            return API.getUser(id);
        });
    });
});
