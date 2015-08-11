define(['app'], function(App) {
    App.module('Tag', function(Tag, App, Backbone, Marionette, $, _) {
        Tag.Model = Backbone.Model.extend({
            urlRoot: App.prefix + '/api/v1/tags'
        });

        Tag.Collection = Backbone.Collection.extend({
            model: Tag.Model,
            url: App.prefix + '/api/v1/tags',
            queryParams: {
                type: function () {
                    return this.type;
                },
                page_size: function () {
                    return this.pageSize;
                }
            },
            initialize: function(options) {
                this.type = options && options.type ? options.type : 'select';
                this.pageSize = options && options.page_size ? options.page_size : 5;
            }
        });

        var API = {
            tagCollection: function (data) {
                var tags = new Tag.Collection(data);
                var defer = $.Deferred();
                tags.fetch({
                    data: data,
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            },
            tagCollectionReset: function (data) {
                var tags = new Tag.Collection();
                var tmp = [];
                for (var i = 0; i < data.length; i++) {
                    tmp[tmp.length] = new Tag.Model(data[i]);
                }
                tags.reset(tmp);
                var defer = $.Deferred();
                defer.resolve(tags);
                return defer.promise();
            }
        };
        App.reqres.setHandler('tag:collection', function (data) {
            return API.tagCollection(data);
        });
        App.reqres.setHandler('tag:reset', function (data) {
            return API.tagCollectionReset(data);
        });
    });
});
