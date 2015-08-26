define([
    'app',
    'paginator',
    'models/model-mixins'
], function(App, PageableCollection, ModelMixins) {
    App.module('Tag', function(Tag, App, Backbone, Marionette, $, _) {
        Tag.Model = Backbone.Model.extend(
            _.extend({}, ModelMixins.LiveModel, {
                urlRoot: App.prefix + '/api/v1/tags',
                initialize: function (options) {
                    if (this.id) {
                        this.liveURI = 'tags/' + this.id;
                        this.startLiveUpdating();
                    }
                }
            })
        );

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
            initialize: function (options) {
                this.type = options && options.type ? options.type : 'select';
                this.pageSize = options && options.page_size ?
                    options.page_size : 5;
            }
        });

        Tag.PageableCollection = PageableCollection.extend(
            _.extend({}, ModelMixins.LiveCollection, {
                model: Tag.Model,
                url: App.prefix + '/api/v1/tags',
                liveURI: 'tags',
                sortKey: 'question_count',
                order: 'desc',
                queryParams: {
                    pageSize: 'page_size',
                    type: function () {
                        return this.type;
                    }
                },
                comparator: function (model1, model2) {
                    var compareField = this.sortKey;

                    if (model1.get(compareField) > model2.get(compareField)) {
                        return -1; // before
                    } else if (model2.get(compareField) > model1.get(compareField)) {
                        return 1; // after
                    } else {
                        return 0; // equal
                    }
                },
                initialize: function (options) {
                    this.type = options && options.type ? options.type : 'select';
                    this.options = options;
                    this.sort();

                    this.startLiveUpdating();
                }
            })
        );

        var API = {
            collection: function (data) {
                var tags;
                var options = data.options ? data.options : {};
                delete data.options;
                if (data['type'] && data['type'] === 'list') {
                    tags = new Tag.PageableCollection(data, options);
                } else {
                    tags = new Tag.Collection(data, options);
                }
                var defer = $.Deferred();
                tags.fetch({
                    data: data,
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (model, response) {
                        if (response.status === 404) {
                            App.trigger('content:not_found');
                        }
                        console.log(response);
                    }
                });
                return defer.promise();
            },
            collectionReset: function (data) {
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
            return API.collection(data);
        });
        App.reqres.setHandler('tag:reset', function (data) {
            return API.collectionReset(data);
        });
    });
});
