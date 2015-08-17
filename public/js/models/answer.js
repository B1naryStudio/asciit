define([
    'app',
    'models/related-timestamps-model',
], function(App, RelatedTimestampsModel) {
    App.module('Answer', function(Answer, App, Backbone, Marionette, $, _) {
        Answer.Model = RelatedTimestampsModel.extend({
            defaults: {
                'description': ''
            },
            validation: {
                description: {
                    required: true
                }
            },
            initialize: function (options) {
                this.urlRoot = App.prefix + '/api/v1/questions/'
                + options.question_id
                + '/answers';

                this.attachLocalDates();
                this.on('sync', this.attachLocalDates);
            }
        });

        Answer.Collection = Backbone.Collection.extend({
            model: Answer.Model,
            url: function () {
                return App.prefix + '/api/v1/questions/'
                    + this.question_id
                    + '/answers';
            },
            initialize: function (options) {
                this.url = App.prefix + '/api/v1/questions/'
                    + options.question_id
                    + '/answers';
            }
        });

        var API = {
            getAnswers: function (question_id) {
                var answers = new Answer.Collection({ question_id: question_id });
                var defer = $.Deferred();

                answers.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });

                return defer.promise();
            },

            addAnswer: function (model) {
                var defer = $.Deferred();

                if (!model.save([], {
                        wait: true,
                        success: function () {
                            defer.resolve(model);
                        },
                        error: function (model, xhr, options) {
                            var errors = JSON.parse(xhr.responseText);
                            defer.reject(errors);
                        }
                    }))
                {
                    defer.reject({
                        description: 'Server error, saving is impossible!'
                    });
                }

                return defer.promise();
            }
        };

        App.reqres.setHandler('answer:collection', function (question_id) {
            return API.getAnswers(question_id);
        });

        App.reqres.setHandler('answer:add', function (data) {
            return API.addAnswer(data);
        })
    });
    return App.Answer;
});
