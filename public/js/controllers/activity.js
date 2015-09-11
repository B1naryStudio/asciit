define([
    'app',
    'views/activity/layout',
    'views/question/by-user',
    'views/answer/by-user',
    'marionette',
    'models/question',
    'models/answer'
], function (App, Layout, QuestionView, AnswersView, Marionette) {
    var Controller = Marionette.Controller.extend({
        activity: function () {
            $.when(
                App.request('question:my'),
                App.request('answer:my')
            ).done(function (questions, answers) {
                var collectionLayout = new Layout();
                App.Main.Views.Layout.getRegion('content').show(collectionLayout);

                var questionsView = new QuestionView({
                    collection: questions.sort()
                });

                collectionLayout
                    .getRegion('questionsRegion')
                    .show(questionsView);
                App.trigger('paginator:get', {
                    collection: questions,
                    success: function (paginatorView) {
                        collectionLayout
                            .getRegion('questionsPaginatorRegion')
                            .show(paginatorView);
                    }
                });

                var answersView = new AnswersView({
                    collection: answers.sort()
                });
                collectionLayout.getRegion('answersRegion').show(answersView);
                App.trigger('paginator:get', {
                    collection: answers,
                    success: function (paginatorView) {
                        collectionLayout
                            .getRegion('answersPaginatorRegion')
                            .show(paginatorView);
                    }
                });
            });
        }
    });
    App.Activity.Controller = new Controller();

    return App.Activity.Controller;
});
