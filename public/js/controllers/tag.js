define([
    'app',
    'views/tag/collection',
    'views/tag/collection-layout',
    'models/tag'
], function (App, CollectionView, CollectionLayout) {
    App.module('Tag', function (Tag, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            tags: function (searchQuery) {
                $.when(App.request(
                    'tag:collection',
                    {
                        type: 'list',
                        search: searchQuery,
                        options: {
                            state: {
                                pageSize: 30
                            }
                        }
                    }
                )).done(function (tags) {
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
                });
            }
        });
        Tag.Controller = new Controller();
    });
    return App.Tag.Controller;
});
