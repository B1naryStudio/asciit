define([
    'app',
    'paginator',
    'models/model-mixins',
    'backbone'
], function (App, PageableCollection, ModelMixins, Backbone) {
    App.Tag.Models.Model = Backbone.Model.extend({
        urlRoot: App.prefix + '/api/v1/tags'
    });

    App.Tag.Models.Collection = Backbone.Collection.extend({
        model: App.Tag.Models.Model,
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

    App.Tag.Models.PageableCollection = PageableCollection.extend({
        model: App.Tag.Models.Model,
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
        }
    });

    var API = _.extend({}, ModelMixins.API, {
        collection: function (data) {
            var tags;
            var options = data.options ? data.options : {};
            delete data.options;

            if (data['type'] && data['type'] === 'list') {
                tags = new App.Tag.Models.PageableCollection(data, options);
            } else {
                tags = new App.Tag.Models.Collection(data, options);
            }

            return this.deferOperation('fetch', tags, [], {
                data: data
            })
        },

        collectionReset: function (data) {
            var tags = new App.Tag.Models.Collection();
            var tmp = [];
            for (var i = 0; i < data.length; i++) {
                tmp[tmp.length] = new App.Tag.Models.Model(data[i]);
            }
            tags.reset(tmp);
            var defer = $.Deferred();
            defer.resolve(tags);
            return defer.promise();
        }
    });

    App.reqres.setHandler('tag:collection', function (data) {
        return API.collection(data);
    });
    App.reqres.setHandler('tag:reset', function (data) {
        return API.collectionReset(data);
    });

    return App.Tag.Models;
});
