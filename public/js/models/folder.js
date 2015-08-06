define(['app'], function(App) {
    App.module('Folder', function(Folder, App, Backbone, Marionette, $, _) {
        Folder.Model = Backbone.Model.extend({
            urlRoot: App.prefix + '/api/v1/folders',
            defaults: {
                'title': ''
            }
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
            }
        };
        App.reqres.setHandler('folder:collection', function () {
            return API.folderCollection();
        });
    });
});
