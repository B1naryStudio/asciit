define(['app'], function(App) {
    App.module('Question', function(Question, App, Backbone, Marionette, $, _) {
        Question.Model = Backbone.Model.extend({
            urlRoot: '/api/v1/questions',
            defaults: {
                'title': '',
                'description': ''
            }
        });

        Question.Collection = Backbone.Collection.extend({
            model: Question.Model,
            url: '/api/v1/questions'
        });

        var API = {
            questionCollection: function () {
                var questions = new Question.Collection();
                var defer = $.Deferred();
                questions.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            },
            questionGet: function (id) {
                var question = new Question.Model({ id: id });
                var defer = $.Deferred();
                question.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        defer.reject(data.validationError);
                    }
                });
                return defer.promise();
            },
            questionAdd: function (data) {
                var question = new Question.Model();
                var defer = $.Deferred();
                if (!question.save(data, {
                    wait: true,
                    success: function (data) {
                        defer.resolve(question);
                    },
                    error: function (data) {
                        defer.reject(data.validationError);
                    }
                })) {
                    defer.reject(question.validationError);
                }
                return defer.promise();
            }
        };
        App.reqres.setHandler('question:collection', function () {
            return API.questionCollection();
        });

        App.reqres.setHandler('question:model', function (id) {
            return API.questionGet(id);
        });

        App.reqres.setHandler('question:add', function (data) {
            return API.questionAdd(data);
        });
    });
});
