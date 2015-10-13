define([
    'app',
    'backbone',
    'paginator',
    'models/model-mixins'
], function (
    App,
    Backbone,
    PageableCollection,
    ModelMixins
) {
    App.Role.Models.RoleModel = Backbone.Model.extend({
        defaults: {
            title: ''
        }
    });

    App.Role.Models.Collection = Backbone.Collection.extend({
        model: App.Role.Models.RoleModel,
        url: App.prefix + '/api/v1/roles'
    });

    App.Role.Models.Global = PageableCollection.extend({
        model: App.Role.Models.RoleModel,
        url: App.prefix + '/api/v1/roles',
        sortKey: 'title',
        order: 'asc',

        state: {
            firstPage: 1,
            pageSize: 10
        },

        queryParams: {
            currentPage: 'page',
            pageSize: 'page_size',
            orderBy: function () {
                return this.sortKey;
            },
            sortedBy: this.order,
            type: 'global'
        },

        initialize: function (options) {
            this.options = options;
        }
    });

    var API = _.extend({}, ModelMixins.API, {
        roleCollection: function() {
            var roles = new App.Role.Models.Collection();
            return this.deferOperation('fetch', roles);
        },
        roleGlobal: function() {
            var roles = new App.Role.Models.Global();
            return this.deferOperation('fetch', roles);
        }
    });

    App.reqres.setHandler('role:collection', function () {
        return API.roleCollection();
    });

    App.reqres.setHandler('role:global', function () {
        return API.roleGlobal();
    });

    App.reqres.setHandler('role:update', function (model) {
        return API.deferOperation('save', model);
    });

    return App.Role.Models;
});
