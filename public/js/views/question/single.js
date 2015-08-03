define([
    'app',
    'tpl!views/templates/question/question-layout.tpl',
    'views/answer/composite',
    'models/answer'
], function (App, QuestionLayoutTpl, AnswersCompositeView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            template: QuestionLayoutTpl,
            regions: {
                answersRegion: '#answers-region'
            },
            onShow: function () {

                    $.when(App.request('answer:collection', this.model.id)).done(function (answers) {
                        var view = new AnswersCompositeView({collection: answers});
                        this.answersRegion.show(view);
                    });

            }
        });
    });
    return App.Question.Views.QuestionLayout;
});