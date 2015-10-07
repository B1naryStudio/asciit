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

        getRoleUrl: function () {
            return App.prefix + '/api/v1/users/' + this.id + '/role';
        },

        updateRole: function (options) {
            var url = this.getRoleUrl();
            var roleId = this.get('role_id');

            options.data = {role_id: roleId};
            options.method = 'post';

            $.ajax(url, options);
        },

        initialize: function () {
            this.urlRoot = App.prefix + '/api/v1/user/login';
        }
    });

    App.User.Models.Collection = PageableCollection.extend({
        model: App.User.Models.Model,
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
        },

        userCollection: function(data) {
            var options = data.options ? data.options : {};
            delete data.options;

            var users = new App.User.Models.Collection({
                searchQuery: data.searchQuery
            }, options);

            return this.deferOperation('fetch', users);
        },

        updateUserRole: function (model) {
            var customOptions = {
                error: function (jqXHR) {
                    var errors =  jqXHR.responseJSON;

                    if (jqXHR.status == 500) {
                        var errorMessage = errors.description ||
                            i18n.t('ui.server-error');
                        this.defer.reject({
                            error: errorMessage
                        });
                    } else {
                        this.defer.reject(errors);
                    }
                }
            };

            return this.deferOperation('updateRole', model, [], customOptions);
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

    App.reqres.setHandler('user:update:role', function (model) {
        return API.updateUserRole(model);
    });

    return App.User.Models;
});
