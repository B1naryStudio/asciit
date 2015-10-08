define([
    'app',
    'marionette',
    'backbone',
    'views/user/collection-layout',
    'views/user/collection',
    'models/role'
], function (
    App,
    Marionette,
    Backbone,
    UsersLayoutView,
    UsersView
) {
    var Controller = Marionette.Controller.extend({
        execute: function (searchQuery, page) {
            $.when(
                App.request('user:collection', {
                    searchQuery: searchQuery,
                    options: {
                        state: {
                            currentPage: page
                        }
                    }
                }),
                App.request('role:collection')
            ).done(function (users, roles) {
                    var usersView = new UsersView({
                        collection: users,
                        searchQuery: searchQuery,
                        childViewOptions: {
                            roles: roles
                        }
                    });

                    var collectionLayout = new UsersLayoutView();

                    App.Main.Views.Layout
                        .getRegion('content')
                        .show(collectionLayout);

                    collectionLayout
                        .getRegion('collectionRegion')
                        .show(usersView);

                    App.trigger('paginator:get', {
                        collection: users,
                        navigate: true,
                        success: function (paginatorView) {
                            collectionLayout
                                .getRegion('paginatorRegion')
                                .show(paginatorView);
                        }
                    });

                    if (!users.length) {
                        usersView.triggerMethod('not:found');
                    }

                    // Updating for search
                    App.User.Controllers.editUsers.listenTo(
                        usersView,
                        'form:submit',
                        function (searchQuery) {
                            Backbone.history.navigate(
                                '/edit-users?' + encodeURIComponent(
                                    searchQuery
                                ),
                                { trigger: true }
                            );
                        }
                    );

                    App.User.Controllers.editUsers.listenTo(
                        usersView,
                        'childview:role:switched',
                        function (childview) {
                            $.when(App.request(
                                'user:update',
                                childview.model
                            )).done(function (updatedModel) {
                                childview.triggerMethod(
                                    'role:updated',
                                    updatedModel
                                );
                            }).fail(function (errors) {
                                childview.triggerMethod(
                                    'model:invalid',
                                    errors
                                );
                            });
                        }
                    );
                }
            );
        }
    });
    App.User.Controllers.editUsers = new Controller();

    return App.User.Controllers.editUsers;
});
