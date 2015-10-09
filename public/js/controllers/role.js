define([
    'app',
    'marionette',
    'backbone',
    'views/role/collection-layout',
    'views/role/collection',
    'models/role'
], function (
    App,
    Marionette,
    Backbone,
    RolesLayoutView,
    RolesView
) {
    var Controller = Marionette.Controller.extend({
        getRoles: function (page) {
            $.when(
                App.request('role:global', {
                    options: {
                        state: {
                            currentPage: page
                        }
                    }
                }),
                App.request('role:collection')
            ).done(function (globalRoles, localRoles) {
                    var view = new RolesView({
                        collection: globalRoles,
                        childViewOptions: {
                            roles: localRoles
                        }
                    });

                    var collectionLayout = new RolesLayoutView();

                    App.Main.Views.Layout
                        .getRegion('content')
                        .show(collectionLayout);

                    collectionLayout
                        .getRegion('collectionRegion')
                        .show(view);

                    App.trigger('paginator:get', {
                        collection: users,
                        navigate: true,
                        success: function (paginatorView) {
                            collectionLayout
                                .getRegion('paginatorRegion')
                                .show(paginatorView);
                        }
                    });

                    if (!globalRoles.length) {
                        view.triggerMethod('not:found');
                    }

                    App.Role.Controller.listenTo(
                        view,
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
    App.Role.Controller = new Controller();

    return App.Role.Controller;
});
