define([
    'app',
    'paginator',
    'models/model-mixins',
    'backbone',
    'stickit'
], function (App, PageableCollection, ModelMixins, Backbone) {
    _.extend((App.Folder || {}), {});

    App.Folder.Models.Model = Backbone.Model.extend(
        _.extend({}, ModelMixins.LiveModel, {
            urlRoot: App.prefix + '/api/v1/folders',
            defaults: {
                'title': ''
            },
            validation: {
                title: {
                    required: true,
                    msg: i18n.t('validation.required-field')
                }
            },
            initialize: function (options) {
                if (this.id) {
                    this.liveURI = 'folders/' + this.id;
                    this.startLiveUpdating();
                }
            }
        })
    );

    App.Folder.Models.Collection = Backbone.Collection.extend({
        model: App.Folder.Models.Model,
        url: App.prefix + '/api/v1/folders',
        sortKey: 'id',

        comparator: function (model1, model2) {
            var compareField = this.sortKey;

            if (model1.get(compareField) > model2.get(compareField)) {
                return -1; // before
            } else if (model2.get(compareField) > model1.get(compareField)) {
                return 1; // after
            } else {
                return 0; // equal
            }
        }
    });

    App.Folder.Models.Folders = PageableCollection.extend(
        _.extend({}, ModelMixins.LiveCollection, {
            model: App.Folder.Models.Model,
            url: App.prefix + '/api/v1/crud-folders',
            liveURI: 'folders',
            sortKey: 'id',
            order: 'desc',

            comparator: function (model1, model2) {
                var compareField = this.sortKey;

                if (model1.get(compareField) > model2.get(compareField)) {
                    return -1; // before
                } else if (
                    model2.get(compareField) > model1.get(compareField)
                ) {
                    return 1; // after
                } else {
                    return 0; // equal
                }
            },
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
                sortedBy: 'desc'
            },
            initialize: function (options) {
                this.sort();
                this.startLiveUpdating();
            }
        })
    );

    debugger;

    var API = _.extend({}, ModelMixins.API, {
        folderCollection: function (page) {           // Why page?
            var folders = new App.Folder.Models.Collection();
            return this.deferOperation('fetch', folders);
        },

        getFolders: function (data) {
            var options = data.options ? data.options : {};
            delete data.options;
            var folders = new App.Folder.Models.Folders(data, options);

            return this.deferOperation('fetch', folders);
        }
    });

    App.reqres.setHandler('folders:fetch', function (collection) {
        return API.deferOperation('fetch', collection);
    });

    App.reqres.setHandler('folder:collection', function () {
        return API.folderCollection();
    });

    App.reqres.setHandler('folder:add', function (model) {
        return API.deferOperation('save', model);
    });

    App.reqres.setHandler('folders:get', function (data) {
        return API.getFolders(data);
    });

    App.reqres.setHandler('folder:update', function (model) {
        return API.deferOperation('save', model);
    });

    App.reqres.setHandler('folder:delete', function (model) {
        return API.deferOperation('destroy', model);
    });

    return App.Folder.Models;
});
