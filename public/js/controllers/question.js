define([
        'app',
        'views/question/collection',
        'views/question/single',
        'views/answer/composite',
        'models/answer',
    ],
    function (App, CollectionView, SingleView, AnswersCompositeView, Answer) {
    App.module('Question', function (Question, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            questions: function () {
                require(['models/question'], function () {
                    $.when(App.request('question:collection')).done(function (questions) {
                        var view = new CollectionView.Questions({collection: questions});
                        App.Main.Layout.getRegion('content').show(view);
                    });
                });
            },

            question: function (id) {
                require(['models/question'], function () {
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
                                        //console.log(errors);
                                        answersView.triggerMethod('data:invalid', errors);
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
