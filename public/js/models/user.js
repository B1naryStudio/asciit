define([
    'app',
    'backbone',
    'models/model-mixins'
], function (
    App,
    Backbone,
    ModelMixins
) {
    App.User.Models.Model = Backbone.Model.extend({
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
            return this.has('role') && this.get('role').title === 'ADMIN';
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
            this.on('sync', this.setAdminFlag);
        }
    });

    var API = _.extend({}, ModelMixins.API, {
        login: function (email, password) {
            var user = new App.User.Models.Model({
                email: email,
                password: password
            });

            return this.deferOperation('save', user, [], {
                wait: true
            });
        },

        session: function () {
            var user = new App.User.Models.Model();

            return this.deferOperation('fetch', user, [], {
                wait: true
            });
        }
    });

    App.reqres.setHandler('user:login', function (email, password) {
        return API.login(email, password);
    });

    App.reqres.setHandler('user:session', function () {
        return API.session();
    });

    return App.User.Models;
});
