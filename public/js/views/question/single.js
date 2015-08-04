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
                'answersRegion': '#answers-region'
            },
            onShow: function () {
                var savedThis = this;

                $.when(App.request('answer:collection', this.model.id)).done(function (answers) {
                    var model = new Backbone.Model({count: answers.length})
                    var view = new AnswersCompositeView({model: model, collection: answers});
                    console.log(savedThis);
                    savedThis.answersRegion.show(view);
                });
            }
        });
    });
    return App.Question.Views.QuestionLayout;
});