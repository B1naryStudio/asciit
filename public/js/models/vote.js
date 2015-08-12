define(['app'], function(App) {
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

/*        var API = {
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
        });*/
    });

    return App.Vote;
});
