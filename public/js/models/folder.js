define([
    'app',
    'paginator',
    'models/model-mixins',
    'stickit'
], function(App, PageableCollection, ModelMixins) {
    App.module('Folder', function(Folder, App, Backbone, Marionette, $, _) {
        Folder.Model = Backbone.Model.extend(
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

        Folder.Collection = Backbone.Collection.extend({
            model: Folder.Model,
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

        Folder.Folders = PageableCollection.extend(
            _.extend({}, ModelMixins.LiveCollection, {
                model: Folder.Model,
                url: App.prefix + '/api/v1/crud-folders',
                liveURI: 'folders',
                sortKey: 'id',
                order: 'desc',

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
                initialize: function(options) {
                    this.sort();
                    this.startLiveUpdating();
                }
            })
        );

        var API = {
            folderCollection: function () {
                var folders = new Folder.Collection();
                var defer = $.Deferred();
                folders.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            },

            addFolder: function (model) {
                var defer = $.Deferred();

                if (!model.save([], {
                        wait: true,
                        success: function () {
                            defer.resolve(model);
                        },
                        error: function (model, xhr, options) {
                            var errors = JSON.parse(xhr.responseText);
                            defer.reject(errors);
                        }
                    })) {
                    defer.reject({
                        description: 'Server error, saving is impossible.'
                    });
                }
                return defer.promise();
            },

            updateFolder: function (model) {
                return this.addFolder(model);
            },

            getFolders: function () {
                var questions = new Folder.Folders();
                var defer = $.Deferred();

                questions.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            },

            deleteFolder: function (model) {
                var defer = $.Deferred();
                if (!model.destroy({
                        wait: true,
                        success: function () {
                            defer.resolve(model);
                        },
                        error: function (model, xhr, options) {
                            var errors = JSON.parse(xhr.responseText);
                            defer.reject(errors);
                        }
                    })) {
                    defer.reject({
                        description: 'Server error, saving is impossible.'
                    });
                }
                return defer.promise();
            }
        };
        App.reqres.setHandler('folder:collection', function () {
            return API.folderCollection();
        });

        App.reqres.setHandler('folder:add', function (data) {
            return API.addFolder(data);
        });

        App.reqres.setHandler('folders:get', function () {
            return API.getFolders();
        });

        App.reqres.setHandler('folder:update', function (model) {
            return API.updateFolder(model);
        });

        App.reqres.setHandler('folder:delete', function (model) {
            return API.deleteFolder(model);
        });
    });
});
