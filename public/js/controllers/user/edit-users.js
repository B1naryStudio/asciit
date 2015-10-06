define([
    'app',
    'marionette',
    'backbone',
    'views/user/collection-layout',
    'views/user/collection',
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
                })
            ).done(function (users, roles) {
                    var usersView = new UsersView({
                        collection: users
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
                }
            );

            console.log('editUsers');
        }
    });
    App.User.Controllers.editUsers = new Controller();

    return App.User.Controllers.editUsers;
});
