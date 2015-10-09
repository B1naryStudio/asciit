define([
    'app',
    'backbone',
    'models/model-mixins',
    'paginator',
], function (
    App,
    Backbone,
    ModelMixins,
    PageableCollection
) {
    App.User.Models.UserModel = Backbone.Model.extend({
        urlRoot: App.prefix + '/api/v1/users',

        defaults: {
            email: '',
            password: '',
            avatar: ''
        },

        isAdmin: function () {
            return this.has('result_role') && this.get('result_role') === 'ADMIN';
        },

        setAdminFlag: function () {
            if (this.isAdmin()) {
                this.set('admin', true);
            } else {
                this.set('admin', false);
            }
        }
    });

    App.User.Models.CurrentUserModel = App.User.Models.UserModel.extend({
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

        initialize: function () {
            this.urlRoot = App.prefix + '/api/v1/users/login';
        }
    });

    App.User.Models.Collection = PageableCollection.extend({
        model: App.User.Models.UserModel,
        url: App.prefix + '/api/v1/users',
        sortKey: 'first_name',
        order: 'asc',

        state: {
            firstPage: 1,
            pageSize: 10
        },

        queryParams: {
            currentPage: 'page',
            pageSize: 'page_size',
            search: function () {
                return this.options.searchQuery;
            },
            orderBy: function () {
                return this.sortKey;
            },
            sortedBy: this.order
        },

        initialize: function (options) {
            this.options = options;
        }
    });

    var API = _.extend({}, ModelMixins.API, {
        login: function (email, password) {
            var user = new App.User.Models.CurrentUserModel({
                email: email,
                password: password
            });

            return this.deferOperation('save', user, [], {
                wait: true
            });
        },

        session: function () {
            var user = new App.User.Models.CurrentUserModel();

            return this.deferOperation('fetch', user, [], {
                wait: true
            });
        },

        userCollection: function(data) {
            var options = data.options ? data.options : {};
            delete data.options;

            var users = new App.User.Models.Collection({
                searchQuery: data.searchQuery
            }, options);

            return this.deferOperation('fetch', users);
        }
    });

    App.reqres.setHandler('user:login', function (email, password) {
        return API.login(email, password);
    });

    App.reqres.setHandler('user:session', function () {
        return API.session();
    });

    App.reqres.setHandler('user:collection', function (data) {
        return API.userCollection(data);
    });

    App.reqres.setHandler('user:update', function (model) {
        return API.deferOperation('save', model);
    });

    return App.User.Models;
});
