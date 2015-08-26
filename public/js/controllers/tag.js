define([
    'app',
    'views/tag/collection',
    'views/tag/collection-layout',
    'views/empty',
    'models/tag'
], function (App, CollectionView, CollectionLayout, EmptyView) {
    App.module('Tag', function (Tag, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            tags: function (searchQuery, page) {
                $.when(
                    App.request(
                        'tag:collection',
                        {
                            type: 'list',
                            search: searchQuery,
                            options: {
                                state: {
                                    pageSize: 30,
                                    currentPage: page
                                }
                            }
                        }
                    )
                ).done(function (tags) {
                    if (searchQuery) {
                        tags.searchQuery = searchQuery; // For live update
                    }

                    var view = new CollectionView({
                        collection: tags.sort(),
                        searchQuery: searchQuery
                    });
                    var collectionLayout = new CollectionLayout();
                    App.Main.Layout
                        .getRegion('content')
                        .show(collectionLayout);
                    collectionLayout
                        .getRegion('collectionRegion')
                        .show(view);

                    App.trigger('paginator:get', {
                        collection: tags,
                        navigate: true,
                        success: function (paginatorView) {
                            collectionLayout
                                .getRegion('paginatorRegion')
                                .show(paginatorView);
                        }
                    });

                    if (!tags.length) {
                        view.triggerMethod('not:found');
                    }

                    // Updating for search
                    Tag.Controller.listenTo(
                        view,
                        'form:submit',
                        function (searchQuery) {
                            Backbone.history.navigate(
                                '/tags?' + searchQuery,
                                { trigger: true }
                            );
                        }
                    );
                }).fail(function (data) {
                    if (data.status === 404) {
                        var view = new EmptyView();
                        App.Main.Layout
                            .getRegion('content')
                            .show(view);
                    }
                });
            }
        });
        Tag.Controller = new Controller();
    });
    return App.Tag.Controller;
});
