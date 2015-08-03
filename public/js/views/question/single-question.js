define(['app', 'tpl!views/templates/question/question-layout.tpl'], function (App, QuestionLayoutTpl) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            template: QuestionLayoutTpl
        });
    });

    return App.Question.Views;

});