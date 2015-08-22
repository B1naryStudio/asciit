define([
    'app',
    'views/folder/layout',
    'views/folder/collection',
    'views/folder/add',
    'models/folder',
], function (App, Layout, FolderCollectionView, NewFolderView, Folder) {
    App.module('Folder', function (Folder, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({

            getFolders: function() {
                $.when(
                    App.request('folders:get')
                ).done(function (folders) {
                    var layout = new Layout();
                    App.Main.Layout.getRegion('content').show(layout);

                    var foldersView = new FolderCollectionView({
                        collection: folders.sort()
                    });
                    layout.getRegion('foldersRegion').show(foldersView);

                    var folder = new Folder.Model();
                    var folderForm = new NewFolderView({model: folder});
                    layout.getRegion('newFolderRegion').show(folderForm);

                    App.trigger('paginator:get', {
                        collection: folders,
                        success: function (paginatorView) {
                            App.helper.paginator = paginatorView;
                            layout
                                .getRegion('paginationRegion')
                                .show(paginatorView);
                        }
                    });

                    Folder.Controller.listenTo(
                        folderForm,
                        'form:submit',
                        function (model) {
                            $.when(App.request('folder:add', model))
                                .done(function (savedModel) {
                                    folders.state.totalRecords++;

                                    if (folders.length > folders.state.pageSize) {
                                        folders.pop();

                                        if (Math.ceil(
                                                folders.state.totalRecords /
                                                folders.state.pageSize
                                            ) > folders.state.totalPages
                                        ) {
                                            folders.state.totalPages++;
                                            folders.state.lastPage++;
                                        }

                                        App.trigger('paginator:get', {
                                            collection: folders,
                                            success: function (paginatorView) {
                                                App.helper.paginator = paginatorView;
                                                layout
                                                    .getRegion('paginationRegion')
                                                    .show(paginatorView);
                                            }
                                        });
                                    }
                                    var newModel = new Folder.Model();
                                    folderForm.triggerMethod(
                                        'model:refresh',
                                        newModel
                                    );

                                    folders.add(savedModel);

                                }).fail(function (errors) {
                                    foldersView.triggerMethod(
                                        'data:invalid',
                                        errors
                                    );
                                });
                        }
                    );

                    Folder.Controller.listenTo(
                        foldersView,
                        'childview:submit:update',
                        function (model) {
                            $.when(App.request('folder:update', model.model))
                                .done(function (savedModel) {
                                    App.helper.controllButtons(model.el, true);
                                }).fail(function (errors) {
                                    foldersView.triggerMethod(
                                        'data:invalid',
                                        errors
                                    );
                                });
                        }
                    );

                    Folder.Controller.listenTo(
                        foldersView,
                        'childview:submit:delete',
                        function (model) {
                            $.when(App.request('folder:delete', model.model))
                                .done(function () {
                                    folders.state.totalRecords--;
                                    if (Math.ceil(
                                            folders.state.totalRecords /
                                            folders.state.pageSize
                                        ) < folders.state.totalPages
                                    ) {
                                        folders.state.totalPages--;
                                        folders.state.lastPage--;
                                        if (folders.state.lastPage <
                                            folders.state.currentPage
                                        ) {
                                            App.helper.paginator.trigger(
                                                'form:page',
                                                folders.state.lastPage
                                            );
                                        } else {
                                            App.helper.paginator.trigger(
                                                'form:page',
                                                folders.state.currentPage
                                            );
                                        }
                                    } else if (
                                        folders.state.totalPages > 1 &&
                                        folders.state.currentPage !==
                                        folders.state.lastPage
                                    ) {
                                        App.helper.paginator.trigger(
                                            'form:page',
                                            folders.state.currentPage
                                        );
                                    }


                                }).fail(function (errors) {
                                    foldersView.triggerMethod(
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
