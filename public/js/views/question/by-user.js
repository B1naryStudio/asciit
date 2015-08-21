define([
    'app',
    'views/question/row',
    'views/empty'
], function (App, QuestionView, EmptyView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionsByUser = Marionette.CollectionView.extend({
            tagName: 'div',
            id: 'question-list',
            className: 'questions-list my-questions',
            childViewContainer: '.list',
            childView: QuestionView,
            emptyView: EmptyView
        });
    });
    return App.Question.Views.QuestionsByUser;
});
