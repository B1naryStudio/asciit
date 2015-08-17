define([
    'app',
    'views/activity/layout',
    'views/question/by-user',
    'views/answer/by-user',
    'views/paginator/paginator',
    'models/question',
    'models/answer'
], function (App, Layout, QuestionView, AnswersView, PaginatorView) {
    App.module('Question', function (Question, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            activity: function () {
                $.when(
                    App.request('question:my'),
                    App.request('answer:my')
                ).done(function (questions, answers) {
                    var collectionLayout = new Layout();
                    App.Main.Layout.getRegion('content').show(collectionLayout);

                    var questionsView = new QuestionView({
                        collection: questions.sort()
                    });
                    var paginatorView = new PaginatorView({
                        collection: questions
                    });
                    collectionLayout
                        .getRegion('questionsRegion')
                        .show(questionsView);
                    collectionLayout
                        .getRegion('questionsPaginatorRegion')
                        .show(paginatorView);

                    var answersView = new AnswersView({
                        collection: answers.sort()
                    });
                    paginatorView = new PaginatorView({
                        collection: answers
                    });
                    collectionLayout.getRegion('answersRegion').show(answersView);
                    collectionLayout.getRegion('answersPaginatorRegion').show(paginatorView);
                });
            }
        });

        Question.Controller = new Controller();
    });
    return App.Question.Controller;
});
