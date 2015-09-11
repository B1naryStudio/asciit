define([
    'app',
    'views/folder/layout',
    'views/folder/collection',
    'views/folder/add',
    'models/folder',
    'views/empty',
    'marionette'
], function (
    App,
    Layout,
    FolderCollectionView,
    NewFolderView,
    Folder,
    EmptyView,
    Marionette
) {
    var Controller = Marionette.Controller.extend({
        current_page: 1,
        getFolders: function (page) {
            var self = this;
            $.when(
                App.request('folders:get', {
                    options: {
                        state: {
                            currentPage: page
                        }
                    }
                })
            ).done(function (folders) {
                var layout = new Layout();
                App.Main.Views.Layout.getRegion('content').show(layout);

                var foldersView = new FolderCollectionView({
                    collection: folders.sort()
                });
                layout.getRegion('foldersRegion').show(foldersView);

                var folder = new App.Folder.Models.Model();
                var folderForm = new NewFolderView({ model: folder });
                layout.getRegion('newFolderRegion').show(folderForm);

                self.updatePagination(folders, layout);

                App.Folder.Controller.listenTo(
                    folderForm,
                    'form:submit',
                    function (model) {
                        $.when(App.request('folder:add', model))
                            .done(function (savedModel) {
                                var current_page_count =
                                    folders.state.totalPages;
                                if (current_page_count < 1) {
                                    current_page_count = 1;
                                    }

                                    var newModel = new Folder.Model();
                                    folderForm.triggerMethod(
                                        'model:refresh',
                                        newModel
                                    );

                                    $.when(
                                        App.request(
                                            'folders:fetch',
                                            folders
                                        )
                                    ).done(function (folders) {
                                        foldersView.render();
                                        if (
                                            current_page_count !==
                                            folders.state.totalPages
                                        ) {
                                            self.updatePagination(
                                                folders,
                                                layout
                                            );
                                        }
                                    });
                                }).fail(function (errors) {
                                    foldersView.triggerMethod(
                                        'data:invalid',
                                        errors
                                    );
                                });
                    }
                );

                App.Folder.Controller.listenTo(
                    foldersView,
                    'childview:submit:update',
                    function (model) {
                        $.when(App.request('folder:update', model.model))
                            .done(function (savedModel) {
                                App.helper.controllButtons(model.$el, true);
                            }).fail(function (errors) {
                                foldersView.triggerMethod(
                                    'data:invalid',
                                    errors
                                );
                            });
                    }
                );

                App.Folder.Controller.listenTo(
                    foldersView,
                    'childview:submit:delete',
                    function (model) {
                        $.when(App.request('folder:delete', model.model))
                            .done(function () {
                                App.trigger('popup:close');
                                if (folders.state.totalPages !== 1) {
                                    var current_page_count =
                                        folders.state.totalPages;

                                    if (
                                        folders.length === 0 &&
                                        folders.state.totalPages > 1
                                    ) {
                                        folders.state.currentPage--;
                                    }

                                    $.when(
                                        App.request(
                                            'folders:fetch',
                                            folders
                                        )
                                    ).done(function (folders) {
                                        if (
                                            current_page_count !==
                                            folders.state.totalPages
                                        ) {
                                            self.updatePagination(
                                                folders,
                                                layout
                                            );
                                        }
                                    });
                                }
                            }).fail(function (errors) {
                                foldersView.triggerMethod(
                                    'data:invalid',
                                    errors
                                );
                            });
                    }
                );
            }).fail(function (data) {
                if (data.status === 404) {
                    var view = new EmptyView();
                    App.Main.Views.Layout
                        .getRegion('content')
                        .show(view);
                }
            });
        },

        updatePagination: function (folders, layout) {
            App.trigger('paginator:get', {
                collection: folders,
                navigate: true,
                success: function (paginatorView) {
                    layout
                        .getRegion('paginationRegion')
                        .show(paginatorView);
                },
                pageChange: this.pageChange
            });
        },

        pageChange: function (page)  {
            App.Folder.Controller.current_page = page;
        }
    });
    App.Folder.Controller = new Controller();

    return App.Folder.Controller;
});
