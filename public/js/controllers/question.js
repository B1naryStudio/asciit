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

                            Question.Controller.listenTo(answersView, 'form:submit', function (data) {
                                console.log('Data received in contoller');

                                $.when(App.request('answer:add', model)).done(function (model) {
                                 console.log('Data saved');
                                 //answersView.render();
                                 //Backbone.history.navigate('/', { trigger: true });
                                 }).fail(function (errors) {
                                 console.log(errors);
                                 //view.triggerMethod('data:invalid', errors);
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
