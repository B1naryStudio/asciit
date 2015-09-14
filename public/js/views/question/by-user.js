define([
    'app',
    'marionette',
    'backbone',
    'views/question/row',
    'views/empty'
], function (
    App,
    Marionette,
    Backbone,
    QuestionView,
    EmptyView
) {
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
