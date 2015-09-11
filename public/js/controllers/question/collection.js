define([
    'app',
    'views/question/collection',
    'views/question/collection-layout',
    'views/tag/collection-popular',
    'marionette',
    'backbone',
    'models/question',
    'models/tag'
], function (
    App,
    CollectionView,
    CollectionLayout,
    TagsView,
    Marionette,
    Backbone
) {
    var Controller = Marionette.Controller.extend({
        execute: function (searchQuery, searchTag, searchFolder, page) {
            $.when(
                App.request(
                    'question:collection',
                    {
                        searchQuery: searchQuery,
                        searchTag: searchTag,
                        searchFolder: searchFolder,
                        options: {
                            state: {
                                currentPage: page
                            }
                        }
                    }
                ),
                App.request(
                    'tag:collection',
                    {
                        type: 'popular',
                        options: {
                            state: {
                                pageSize: 10
                            }
                        }
                    }
                )
            ).done(function (questions, tags) {
                // For live update
                if (searchQuery) {
                    questions.searchQuery = searchQuery;
                }

                var tmp = searchTag.length ? 'tag: ' + searchTag :
                    (searchFolder.length ? 'folder: ' + searchFolder :
                        searchQuery);

                var questionsView = new CollectionView({
                    collection: questions.sort(),
                    searchQuery: tmp,
                    searchTag: searchTag
                });
                var tagsView = new TagsView({
                    collection: tags
                });
                var collectionLayout = new CollectionLayout();
                App.Main.Views.Layout
                    .getRegion('content')
                    .show(collectionLayout);

                collectionLayout
                    .getRegion('collectionRegion')
                    .show(questionsView);

                collectionLayout
                    .getRegion('tagsRegion')
                    .show(tagsView);

                App.trigger('paginator:get', {
                    collection: questions,
                    navigate: true,
                    success: function (paginatorView) {
                        collectionLayout
                            .getRegion('paginatorRegion')
                            .show(paginatorView);
                    }
                });

                if (!questions.length) {
                    questionsView.triggerMethod('not:found');
                }

                // Updating for search
                App.Question.Controllers.Collection.listenTo(
                    questionsView,
                    'form:submit',
                    function (searchQuery) {
                        var query;
                        if (/tag\:(.+)/.test(searchQuery)) {
                            query = $.trim(searchQuery.replace(
                                /tag\:(.+)/,
                                '$1'
                            ));
                            questionsView.options.searchQuery = '';
                            Backbone.history.navigate(
                                '/tags/' + encodeURIComponent(query),
                                { trigger: true }
                            );
                        } else if (/folder\:(.+)/.test(searchQuery)) {
                            query = $.trim(searchQuery.replace(
                                /folder\:(.+)/,
                                '$1'
                            ));
                            questionsView.options.searchQuery = '';
                            Backbone.history.navigate(
                                '/folders/' + encodeURIComponent(query),
                                { trigger: true }
                            );
                        } else {
                            questionsView.options.searchTag = '';
                            Backbone.history.navigate(
                                '/questions?' + encodeURIComponent(
                                    searchQuery
                                ),
                                { trigger: true }
                            );
                        }
                    }
                );
            });
        }
    });
    App.Question.Controllers.Collection = new Controller();

    return App.Question.Controllers.Collection;
});
