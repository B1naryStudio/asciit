define(['app'], function (App) {
    App.module('User', function (User, App, Backbone, Marionette, $, _) {
        User.Model = Backbone.Model.extend({
            defaults: {
                email: '',
                password: '',
                avatar: ''
            },
            validation: {
                email: {
                    required: true,
                    pattern: 'email',
                    msg: i18n.t('validation.invalid-value')
                },
                password: {
                    required: true,
                    msg: i18n.t('validation.required-field')
                }
            },
            isAdmin: function () {
                if (this.has('role') && this.get('role').title == 'ADMIN') {
                    return true;
                }

                return false;
            },
            setAdminFlag: function () {
                if (this.isAdmin()) {
                    this.set('admin', true);
                } else {
                    this.set('admin', false);
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
                    success: function (model, response, options) {
                        model.setAdminFlag();
                        defer.resolve(model);
                    },
                    error: function (data) {
                        defer.reject(data.validationError);
                    }
                })) {
                    defer.reject(user.validationError);
                }
                return defer.promise();
            },

            session: function () {
                var user = new User.Model();
                var defer = $.Deferred();
                user.fetch({
                    wait: true,
                    success: function (model, response, options) {
                        model.setAdminFlag();
                        defer.resolve(model);

                    },
                    error: function (model, response, options) {
                        defer.reject();
                    }
                });
                return defer.promise();

            }

        };

        App.reqres.setHandler('user:login', function (email, password) {
            return API.login(email, password);
        });

        App.reqres.setHandler('user:session', function () {
            return API.session();
        });
    });
});
