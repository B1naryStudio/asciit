define([
    'app',
    'views/question/single',
    'views/answer/collection',
    'views/comment/collection',
    'views/empty',
    'models/answer',
    'models/comment',
    'models/question',
    'models/folder',
    'models/tag'
], function (
    App,
    SingleView,
    AnswersView,
    CommentsView,
    EmptyView,
    Answer,
    Comment
) {
    App.module('Question.ControllerOptions', function (ControllerOptions, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            execute: function (id, answer_id) {
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
                                ControllerOptions.Single.listenTo(
                                    answersView,
                                    'editor:created',
                                    function (editor) {
                                        questionView.newAnswerEditor = editor;
                                    }
                                );
                                questionView.answersRegion.show(answersView);

                                ControllerOptions.Single.listenTo(
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
                                            }
                                        );
                                    }
                                );

                                ControllerOptions.Single.listenTo(
                                    answersView,
                                    'childview:submit:update',
                                    function (childview) {
                                        $.when(App.request(
                                            'answer:update',
                                            childview.model
                                        )).done(function (savedModel) {
                                            childview.triggerMethod(
                                                'model:updated',
                                                savedModel
                                            );
                                        }).fail(function (errors) {
                                            childview.triggerMethod(
                                                'model:invalid',
                                                errors
                                            );
                                        });
                                    }
                                );

                                ControllerOptions.Single.listenTo(
                                    answersView,
                                    'childview:submit:delete',
                                    function (childview) {
                                        $.when(App.request(
                                            'answer:delete',
                                            childview.model
                                        )).fail(function (errors) {
                                            childview.triggerMethod(
                                                'delete:error',
                                                errors
                                            );
                                        });
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

                                ControllerOptions.Single.listenTo(
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
                                                    'model:invalid',
                                                    errors
                                                );
                                            }
                                        );
                                    }
                                );

                                ControllerOptions.Single.listenTo(
                                    commentsView,
                                    'childview:submit:delete',
                                    function (childview) {
                                        $.when(App.request(
                                            'comment:delete',
                                            childview.model
                                        )).fail(function (errors) {
                                            childview.triggerMethod(
                                                'delete:error',
                                                errors
                                            );
                                        });
                                    }
                                );

                                ControllerOptions.Single.listenTo(
                                    questionView,
                                    'submit:delete',
                                    function (model) {
                                        $.when(App.request(
                                            'question:delete',
                                            model
                                        )).done(function () {
                                                Backbone.history.navigate(
                                                    '/questions',
                                                    { trigger: true }
                                                );
                                            }
                                        ).fail(function (errors) {
                                                questionView.triggerMethod(
                                                    'delete:error',
                                                    errors
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
            }
        });
        ControllerOptions.Single = new Controller();
    });
    return App.Question.ControllerOptions.Single;
});