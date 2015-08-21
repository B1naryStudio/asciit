define([
    'app',
    'views/folder/layout',
    'views/folder/collection',
    'models/folder',
    'views/paginator/paginator'
], function (App, Layout, CollectionView, Folder, paginatorView) {
    App.module('Folder', function (Folder, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({

            getFolders: function() {
                $.when(
                    App.request('folders:get')
                ).done(function (folders) {
                    var layout = new Layout();
                    App.Main.Layout.getRegion('content').show(layout);

                    var folder = new Folder.Model();
                    var folderView = new CollectionView({
                        collection: folders.sort(),
                        model: folder
                    });
                    layout.getRegion('foldersRegion').show(folderView);

                    App.trigger('paginator:get', {
                        collection: folders,
                        success: function (paginatorView) {
                            layout
                                .getRegion('paginationRegion')
                                .show(paginatorView);
                        }
                    });

                    Folder.Controller.listenTo(
                        folderView,
                        'form:submit',
                        function (model) {
                            $.when(App.request('folder:add', model))
                                .done(function (savedModel) {
                                    folders.unshift(new Folder.Model({
                                        title: savedModel.attributes.title
                                    }));
                                    if (folders.length > folders.state.pageSize) {
                                        folders.state.totalPages += 1;
                                        folders.state.lastPage += 1;
                                        folders.state.totalRecords += 1;
                                        App.trigger('paginator:get', {
                                            collection: folders,
                                            success: function (paginatorView) {
                                                layout
                                                    .getRegion('paginationRegion')
                                                    .show(paginatorView);
                                            }
                                        });
                                    }

                                    folders.pop();
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
                                    App.helper.controllButtons(model.el, true);
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
                        'childview:folder:destroy',
                        function (model) {
                            $.when(App.request('folder:delete', model.model))
                                .done(function () {
                                    if (folders.length == 0) {
                                        folders.state.totalPages -= 1;
                                        folders.state.lastPage -= 1;
                                        folders.state.totalRecords -= 1;
                                        $('.paginator')
                                            .find('.page:last')
                                            .prev().find('a').trigger('click')
                                    }
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
});
