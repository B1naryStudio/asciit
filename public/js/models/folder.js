define(['app'], function(App) {
    App.module('Folder', function(Folder, App, Backbone, Marionette, $, _) {
        Folder.Model = Backbone.Model.extend({
            urlRoot: App.prefix + '/api/v1/folders',
            defaults: {
                'title': ''
            },
            validation: {
                title: {
                    required: true
                }
            },
        });

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
            },
        });

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
            }
        };
        App.reqres.setHandler('folder:collection', function () {
            return API.folderCollection();
        });

        App.reqres.setHandler('folder:add', function (data) {
            return API.addFolder(data);
        });
    });
});
