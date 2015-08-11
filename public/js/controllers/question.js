define([
    'app',
    'views/question/collection',
    'views/question/collection_layout',
    'views/question/paginator',
    'views/question/single',
    'views/question/add',
    'views/folder/select',
    'views/answer/composite',
    'views/tag/select',
    'models/answer',
    'models/question',
    'models/folder'
], function (App, CollectionView, CollectionLayout, PaginatorView, SingleView, AddView, SelectFolderView, AnswersCompositeView, SelectTagView, Answer) {
    App.module('Question', function (Question, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            questions: function (searchQuery) {
                $.when(App.request('question:collection', searchQuery)).done(function (questions) {
                    var questionsView = new CollectionView({collection: questions.sort(), searchQuery: searchQuery});
                    var paginatorView = new PaginatorView({collection: questions});
                    var collectionLayout = new CollectionLayout();
                    App.Main.Layout.getRegion('content').show(collectionLayout);
                    collectionLayout.getRegion('collectionRegion').show(questionsView);
                    collectionLayout.getRegion('paginatorRegion').show(paginatorView);

                    // Updating for search
                    Question.Controller.listenTo(questionsView, 'form:submit', function (searchQuery) {
                        $.when(App.request('question:collection', searchQuery))
                            .done(function (questions) {
                                // If any results
                                if (questions.length) {
                                    Backbone.history.navigate('/questions?' + searchQuery, {trigger: true});
                                } else {
                                    questionsView.triggerMethod('not:found');
                                }
                            });
                    });
                });
            },

            question: function (id) {
                $.when(
                    App.request('question:model', id),
                    App.request('answer:collection', id)
                ).done(function (question, answers) {
                    // New question layout
                    var questionView = new SingleView({model: question});
                    App.Main.Layout.getRegion('content').show(questionView);

                    // New answer model for saving a new answer
                    var model = new  Answer.Model({
                        question_id: id,
                        count: answers.length
                    });

                    // New answers view
                    var answersView = new AnswersCompositeView({model: model, collection: answers});
                    questionView.answersRegion.show(answersView);

                    Question.Controller.listenTo(answersView, 'form:submit', function (model) {
                        $.when(App.request('answer:add', model))
                            .done(function (savedModel) {
                                answers.push(savedModel);

                                // Add model and form clearing
                                var freshModel = new  Answer.Model({
                                    question_id: id,
                                    count: answers.length
                                });

                                answersView.triggerMethod('model:refresh', freshModel);
                            }).fail(function (errors) {
                                answersView.triggerMethod('data:invalid', errors);
                            });
                    });
                });
            },

            add: function () {
                $.when(App.request('folder:collection')).done(function (folders) {
                    $.when(App.request('tag:collection')).done(function (tags) {
                        var folder_view = new SelectFolderView({collection: folders});
                        var tag_view = new SelectTagView({collection: tags});
                        var view = new AddView({
                            model: new Question.Model(),
                            folder_view: folder_view,
                            tag_view: tag_view
                        });
                        App.trigger('popup:show', {
                            header: {
                                title: 'Add new question'
                            },
                            class: 'question-add',
                            contentView: view
                        });

                        Question.Controller.listenTo(view, 'form:submit', function (data) {
                            $.when(App.request('question:add', data)).done(function (model) {
                                App.trigger('popup:close');
                                App.trigger('questions:list');
                            }).fail(function (errors) {
                                view.triggerMethod('data:invalid', errors);
                            });
                        });
                    });
                });
            }
        });

        Question.Controller = new Controller();
    });
    return App.Question.Controller;
});
