define([
    'app',
    'views/question/collection',
    'views/question/collection-layout',
    'views/question/single',
    'views/question/add',
    'views/folder/select',
    'views/answer/collection',
    'views/tag/select',
    'views/tag/collection-popular',
    'models/answer',
    'views/comment/collection',
    'models/comment',
    'views/empty',
    'models/question',
    'models/folder',
    'models/tag'
], function (
    App,
    CollectionView,
    CollectionLayout,
    SingleView,
    AddView,
    SelectFolderView,
    AnswersView,
    SelectTagView,
    TagsView,
    Answer,
    CommentsView,
    Comment,
    EmptyView
) {
    App.module('Question', function (Question, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            questions: function (searchQuery, searchTag, searchFolder, page) {
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
                    if (searchQuery) {
                        questions.searchQuery = searchQuery; // For live update
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
                    App.Main.Layout
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
                    Question.Controller.listenTo(
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
                                    '/questions?' + encodeURIComponent(searchQuery),
                                    { trigger: true }
                                );
                            }
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
            },

            question: function (id, answer_id) {
                $.when(App.request('question:model', id))
                    .done(function (question) {
                    $.when(App.request('answer:collection', question.get('id')))
                        .done(function (answers) {
                            // New question layout
                            var questionView = new SingleView({
                                model: question
                            });

                            App.Main.Layout
                                .getRegion('content')
                                .show(questionView);

                            // New answer model for saving a new answer
                            var model = new Answer.Model({
                                question_id: question.get('id'),
                                count: answers.length
                            });

                            // New answers view
                            var answersView = new AnswersView({
                                model: model,
                                collection: answers,
                                answer_id: answer_id
                            });
                            Question.Controller.listenTo(
                                answersView,
                                'editor:created',
                                function (editor) {
                                    questionView.newAnswerEditor = editor;
                                }
                            );
                            questionView.answersRegion.show(answersView);

                            Question.Controller.listenTo(
                                answersView,
                                'form:submit',
                                function (model) {
                                    $.when(App.request('answer:add', model))
                                        .done(function (savedModel) {
                                            answers.push(savedModel);

                                            // Add model and form clearing
                                            var freshModel = new Answer.Model({
                                                question_id: question.get('id'),
                                                count: answers.length
                                            });

                                            answersView.triggerMethod(
                                                'model:refresh',
                                                freshModel
                                            );
                                        }).fail(function (errors) {
                                            answersView.triggerMethod(
                                                'model:invalid',
                                                errors
                                            );
                                        });
                                }
                            );

                            Question.Controller.listenTo(
                                answersView,
                                'childview:submit:delete',
                                function (childview) {
                                    App.request(
                                        'answer:delete',
                                        childview.model
                                    );
                                }
                            );

                            // New comments to question view
                            var commentModel = new Comment.Model({
                                q_and_a_id: question.get('id')
                            });

                            var collectionComments = new Comment.Collection(
                                question.attributes.comments,
                                { q_and_a_id: question.get('id') }
                            );
                            var commentsView = new CommentsView({
                                model: commentModel,
                                collection: collectionComments,
                                id: question.get('id')
                            });
                            questionView.commentsRegion.show(commentsView);

                            Question.Controller.listenTo(
                                commentsView,
                                'form:submit',
                                function (model) {
                                    $.when(App.request('comment:add', model))
                                        .done(function (savedModel) {
                                            collectionComments.push(savedModel);
                                            // Add model and form clearing
                                            var newModel = new Comment.Model({
                                                q_and_a_id: question.get('id')
                                            });

                                            commentsView.triggerMethod(
                                                'model:refresh',
                                                newModel
                                            );
                                        }).fail(function (errors) {
                                            commentsView.triggerMethod(
                                                'data:invalid',
                                                errors
                                            );
                                        }
                                    );
                                }
                            );

                            Question.Controller.listenTo(
                                commentsView,
                                'childview:submit:delete',
                                function (childview) {
                                    App.request(
                                        'comment:delete',
                                        childview.model
                                    );
                                }
                            );

                            Question.Controller.listenTo(
                                questionView,
                                'submit:delete',
                                function (model) {
                                    App.trigger('popup:close');

                                    $.when(App.request(
                                        'question:delete',
                                        model
                                    )).done(function () {
                                            Backbone.history.navigate(
                                                '/questions',
                                                { trigger: true }
                                            );
                                        }
                                    );
                                }
                            );
                        });
                }).fail(function (data) {
                    if (data.status === 404) {
                        var view = new EmptyView();
                        App.Main.Layout
                            .getRegion('content')
                            .show(view);
                    }
                });
            },

            add: function () {
                $.when(
                    App.request('folder:collection'),
                    App.request('tag:collection', {
                        type: 'search',
                        page_size: 10
                    })
                ).done(function (folders, tags) {
                    var folder_view = new SelectFolderView({
                        collection: folders
                    });
                    var tag_view = new SelectTagView({
                        collection: tags
                    });
                    var view = new AddView({
                        folder_view: folder_view,
                        tag_view: tag_view
                    });
                    App.trigger('popup:show', {
                        header: {
                            title: i18n.t('questions.add-title')
                        },
                        class: 'question-add',
                        contentView: view
                    });

                    Question.Controller.listenTo(
                        view,
                        'form:submit',
                        function (model) {
                            $.when(App.request('question:add', model))
                                .done(function () {
                                    App.trigger('popup:close');
                                    App.trigger('questions:list');
                                }).fail(function (errors) {
                                    view.triggerMethod('data:invalid', errors);
                                }
                            );
                        }
                    );
                });
            }
        });

        Question.Controller = new Controller();
    });
    return App.Question.Controller;
});
