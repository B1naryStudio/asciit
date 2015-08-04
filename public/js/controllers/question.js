define(['app', 'views/question/collection', 'views/question/single'], function (App, CollectionView, SingleView) {
    App.module('Question', function (Question, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            questions: function () {
                require(['models/question'], function () {
                    $.when(App.request('question:collection')).done(function (questions) {
                        var view = new CollectionView.Questions({collection: questions});
                        App.Main.Layout.getRegion('content').show(view);
                    });
                });
            },

            question: function (id) {
                require(['models/question'], function () {
                    $.when(App.request('question:model', id)).done(function (question) {
                        var view = new SingleView({model: question});
                        App.Main.Layout.getRegion('content').show(view);
                    });
                });
            }
        });
        Question.Controller = new Controller();
    });
    return App.Question.Controller;
});
