define(['app', 'moment'], function(App, moment) {
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
            addComment: function (model) {
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
