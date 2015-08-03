define(['app'], function(App) {
    App.module('Question', function(Question, App, Backbone, Marionette, $, _) {
        Question.Model = Backbone.Model.extend({
            urlRoot: '/questions',
            defaults: {
            }
        });

        Question.Collection = Backbone.Collection.extend({
            model: Question.Model,
            url: '/questions'
        });

        var API = {
            getQuestions: function () {
                var questions = new Question.Collection();
                var defer = $.Deferred();
                questions.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            },
            getQuestion: function (id) {
                var question = new Question.Model({ id: id });
                var defer = $.Deferred();
                question.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        defer.resolve(undefined);
                    }
                });
                return defer.promise();
            }
        };
        App.reqres.setHandler('question:collection', function () {
            return API.getQuestions();
        });

        App.reqres.setHandler('question:model', function (id) {
            return API.getQuestion(id);
        });
    });
});
