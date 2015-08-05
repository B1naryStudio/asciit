define([
    'app',
    'tpl!views/templates/question/question-layout.tpl',
    'views/answer/composite',
    'models/answer',
    'stickit'
], function (App, QuestionLayoutTpl, AnswersCompositeView, Answer) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            template: QuestionLayoutTpl,
            regions: {
                'answersRegion': '#answers-region'
            }
        });
    });
    return App.Question.Views.QuestionLayout;
});