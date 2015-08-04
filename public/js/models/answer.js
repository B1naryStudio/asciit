define(['app'], function(App) {
    App.module('Answer', function(Answer, App, Backbone, Marionette, $, _) {
        Answer.Model = Backbone.Model.extend({
            defaults: {
                'description': ''
            },
            initialize: function (options) {
                this.urlRoot = '/api/v1/questions/'
                    + options.question_id
                    + '/answers';
            }
        });

        Answer.Collection = Backbone.Collection.extend({
            model: Answer.Model,
            initialize: function (options) {
                this.url = '/api/v1/questions/'
                + options.question_id
                + '/answers';
            }
        });

        var API = {
            getAnswers: function (question_id) {
                var answers = new Answer.Collection({question_id: question_id});
                var defer = $.Deferred();
                answers.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            }
        };
        App.reqres.setHandler('answer:collection', function (question_id) {
            return API.getAnswers(question_id);
        });
    });
});
