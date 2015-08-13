define(['app'], function(App) {
    App.module('Comment', function(Comment, App, Backbone, Marionette, $, _) {
        Comment.Model = Backbone.Model.extend({
            defaults: {
                'text': ''
            },
            validation: {
                text: {
                    required: true
                }
            },
            initialize: function (options) {
                this.urlRoot = App.prefix + '/api/v1/questions/'
                    + options.question_id
                    + '/comments';
            }
        });

        Comment.Collection = Backbone.Collection.extend({
            model: Comment.Model,
            url: function () {
                return App.prefix + '/api/v1/questions/'
                    + this.question_id
                    + '/comments';
            },
            initialize: function (options) {
                this.url = App.prefix + '/api/v1/questions/'
                    + this.question_id
                    + '/comments';
            }
        });

        var API = {
            //getAnswers: function (question_id) {
            //    var answers = new Answer.Collection({question_id: question_id});
            //    var defer = $.Deferred();
            //
            //    answers.fetch({
            //        success: function (data) {
            //            defer.resolve(data);
            //        }
            //    });
            //
            //    return defer.promise();
            //},

            addComment: function (model) {
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
                    })) {
                    defer.reject({'description': 'Server error, saving is impossible.'});
                }

                return defer.promise();
            }
        };

        App.reqres.setHandler('comment:add', function (data) {
            return API.addComment(data);
        })
    });
    return App.Comment;
});
