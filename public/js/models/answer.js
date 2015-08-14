define(['app', 'moment'], function(App, moment) {
    App.module('Answer', function(Answer, App, Backbone, Marionette, $, _) {
        Answer.Model = Backbone.Model.extend({
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
            },
            attachLocalDates: function () {
                var updatedLocal = moment.utc(this.get('updated_at')).toDate();
                this.set('updated_local', moment(updatedLocal).format('MMMM Do YYYY, h:mm:ss a'));
                var createdLocal = moment.utc(this.get('created_at')).toDate();
                this.set('created_local', moment(createdLocal).format('MMMM Do YYYY, h:mm:ss a'));
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
                var answers = new Answer.Collection({question_id: question_id});
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
                model.set('created_at', moment().format('MMMM Do YYYY, h:mm:ss a'));

                if (!model.save([], {
                        wait: true,
                        success: function () {
                            defer.resolve(model);
                        },
                        error: function (model, xhr, options) {
                            var errors = JSON.parse(xhr.responseText);
                            defer.reject(errors);
                        }
                    })) {
                    defer.reject({'description': 'Server error, saving is impossible!'});
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
