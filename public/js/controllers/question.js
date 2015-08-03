define(['app', 'views/question/single-question'], function (App, View) {
    App.module('Question', function (Question, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            questions: function () {
                require(['models/question'], function () {
                    $.when(App.request('question:collection')).done(function (questions) {
                        var view = new View.Questions({collection: questions});
                        App.Main.Layout.getRegion('content').show(view);
                    });
                });
            },

            question: function (id) {
                require(['models/question'], function () {
                    $.when(App.request('question:model', id)).done(function (question) {
                        var view = new View.QuestionLayout({model: question});
                        App.Main.Layout.getRegion('content').show(view);
                    });
                });
            }
        });
        Question.Controller = new Controller();
    });
    return App.Question.Controller;
});
