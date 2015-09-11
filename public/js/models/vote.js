define(['app', 'models/model-mixins', 'backbone'], function (App, ModelMixins) {
    App.Vote.Models.Model = Backbone.Model.extend({
        urlRoot: App.prefix + '/api/v1/votes',
        defaults: {
            'sign': 1
        }
    });

    App.Vote.Models.Collection = Backbone.Collection.extend({
        model: App.Vote.Models.Model,
        url: App.prefix + '/api/v1/votes'
    });

    var API = ModelMixins.API;

    App.reqres.setHandler('vote:add', function (model) {
        return API.deferOperation('save', model);
    });
    App.reqres.setHandler('vote:cancel', function (model) {
        return API.deferOperation('destroy', model);
    });

    return App.Vote.Models;
});
