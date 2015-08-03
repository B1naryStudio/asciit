define(['app', 'tpl!views/templates/question/collection.tpl', 'tpl!views/templates/question/row.tpl'], function (App, QuestionsTpl, QuestionTpl) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionCollectionRow = Marionette.ItemView.extend({
            tagName: 'div',
            template: QuestionTpl
        });

        View.Questions = Marionette.CompositeView.extend({
            tagName: 'div',
            className: 'row',
            template: QuestionsTpl,
            childView: View.QuestionCollectionRow,
            childViewContainer: '.list'
        });
    });
    return App.Question.Views;
});
