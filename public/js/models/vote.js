define(['app', 'models/model-mixins'], function(App, ModelMixins) {
    App.module('Vote', function(Vote, App, Backbone, Marionette, $, _) {
        Vote.Model = Backbone.Model.extend({
            urlRoot: App.prefix + '/api/v1/votes',
            defaults: {
                'sign': 1
            }
        });

        Vote.Collection = Backbone.Collection.extend({
            model: Vote.Model,
            url: App.prefix + '/api/v1/votes'
        });

        var API = ModelMixins.API;

        App.reqres.setHandler('vote:add', function (model) {
            return API.saveModel(model);
        });
        App.reqres.setHandler('vote:cancel', function (model) {
            return API.deleteModel(model);
        });
    });

    return App.Vote;
});
