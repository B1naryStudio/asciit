define(['app', 'views/tag/collection', 'models/tag'], function (App, CollectionView) {
    App.module('Tag', function (Tag, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            tags: function () {
                $.when(App.request('tag:collection')).done(function (tags) {
                    var view = new CollectionView({ collection: tags });
                    App.Main.Layout.getRegion('content').show(view);
                });
            }
        });
        Tag.Controller = new Controller();
    });
    return App.Tag.Controller;
});
