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
            url: App.prefix + '/api/v1/folders'
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
