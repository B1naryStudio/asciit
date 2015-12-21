define([
    'app',
    'marionette',
    'backbone',
    'views/empty',
    'tpl!views/templates/question/empty.tpl'
], function (
    App,
    Marionette,
    Backbone,
    EmptyView,
    EmptyQuestionTpl
) {
    App.Question.Views.Empty = EmptyView.extend({
        id: 'empty-question-view',
        template: EmptyQuestionTpl
    });

    return App.Question.Views.Empty;
});
