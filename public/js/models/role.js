define([
    'app',
    'backbone',
], function (
    App,
    Backbone
) {
    App.Role.Models.Model = Backbone.Model.extend({
        defaults: {
            title: ''
        }
    });

    App.Role.Models.Collection = Backbone.Collection.extend({
        model: App.Role.Models.Model,
        url: App.prefix + '/api/v1/roles',
        sortKey: 'title',
        order: 'desc',

        initialize: function (options) {
            this.sort();
        }
    });

    var API = _.extend({}, ModelMixins.API, {
        roleCollection: function() {
            var roles = new App.Role.Models.Collection();
            return this.deferOperation('fetch', roles);
        }
    });

    App.reqres.setHandler('role:collection', function () {
        return API.roleCollection();
    });

    return App.Role.Models;
});
