define([
    'app',
    'views/question/row',
    'views/empty',
    'marionette'
], function (App, QuestionView, EmptyView, Marionette) {
    App.Question.Views.QuestionsByUser = Marionette.CollectionView.extend({
        tagName: 'div',
        id: 'question-list',
        className: 'questions-list my-questions',
        childViewContainer: '.list',
        childView: QuestionView,
        emptyView: EmptyView
    });
    return App.Question.Views.QuestionsByUser;
});
