define(['app'], function(App) {
    App.module('Tag', function(Tag, App, Backbone, Marionette, $, _) {
        Tag.Model = Backbone.Model.extend({
            urlRoot: '/api/v1/tags'
        });

        Tag.Collection = Backbone.Collection.extend({
            model: Tag.Model,
            url: '/api/v1/tags'
        });

        var API = {
            tagCollection: function () {
                var tags = new Tag.Collection();
                var defer = $.Deferred();
                tags.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            }
        };
        App.reqres.setHandler('tag:collection', function () {
            return API.tagCollection();
        });
    });
});
