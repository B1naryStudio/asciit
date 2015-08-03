define(['app', 'tpl!views/templates/answer/answers.tpl',
    'tpl!views/templates/answer/single-answer.tpl'
], function (App, AnswersTpl, SingleAnswerTpl) {
    App.module('Answer.Views', function (View, App, Backbone, Marionette, $, _) {
        View.SingleAnswerCompositeView = Marionette.CompositeView.extend({
            tagName: 'div',
            className: 'answer',
            template: SingleAnswerTpl
        });

        View.AnswersCompositeView = Marionette.CompositeView.extend({
            tagName: 'section',
            className: '',
            template: AnswersTpl,
            childView: View.SingleAnswerCompositeView,
            childViewContainer: '#answers'
        });
    });
    return App.Answer.Views.AnswersCompositeView;
});
