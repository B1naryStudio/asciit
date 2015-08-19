define([
    'app',
    'views/question/row',
    'views/tag/view'
], function (App, QuestionView, TagView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionsByUser = Marionette.CollectionView.extend({
            tagName: 'div',
            id: 'question-list',
            className: 'questions-list my-questions',
            childViewContainer: '.list',
            childView: QuestionView
        });
    });
    return App.Question.Views.QuestionsByUser;
});
