define([
    'app',
    'views/folder/layout',
    'views/folder/collection',
    'models/folder'
], function (App, Layout, CollectionView, Folder
) {
    App.module('Folder', function (Folder, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
           getAll: function() {
               $.when(
                   App.request('folder:collection')
               ).done(function (folders, tags) {
                   var layout = new Layout();
                   App.Main.Layout.getRegion('content').show(layout);

                       var folder = new Folder.Model();
                       var folderView = new CollectionView({
                           collection: folders,
                           model: folder
                       });
                       layout.getRegion('foldersRegion').show(folderView);

                       Folder.Controller.listenTo(
                           folderView,
                           'form:submit',
                           function (model) {
                               $.when(App.request('folder:add', model))
                                   .done(function (savedModel) {
                                       folders.unshift(savedModel);
                                       var newModel = new Folder.Model();
                                       folderView.triggerMethod(
                                           'model:refresh',
                                           newModel
                                       );
                                   }).fail(function (errors) {
                                       folderView.triggerMethod(
                                           'data:invalid',
                                           errors
                                       );
                                   });
                           }
                       );

                       Folder.Controller.listenTo(
                           folderView,
                           'childview:folder:update',
                           function (model) {
                               $.when(App.request('folder:add', model.model))
                                   .done(function (savedModel) {

                                   }).fail(function (errors) {
                                       folderView.triggerMethod(
                                           'data:invalid',
                                           errors
                                       );
                                   });
                           }
                       );

               });
           }
        });
        Folder.Controller = new Controller();

    });

    return App.Folder.Controller;
})
