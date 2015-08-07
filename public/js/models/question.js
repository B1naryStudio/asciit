define(['app', 'paginator'], function(App) {
    App.module('Question', function(Question, App, Backbone, Marionette, $, _) {
        Question.Model = Backbone.Model.extend({
            urlRoot: App.prefix + '/api/v1/questions',
            validation: {
                title: {
                    required: true,
                    msg: 'Please enter a title'
                },
                description: {
                    required: true,
                    msg: 'Please enter a description'
                }
            }
        });

        Question.Collection = Backbone.Collection.extend({
            model: Question.Model,
            url: App.prefix + '/api/v1/questions',
            comparator: function (model1, model2) {
                var compareField = 'updated_at';

                if (model1.get(compareField) > model2.get(compareField)) {
                    return -1; // before
                } else if (model2.get(compareField) > model1.get(compareField)) {
                    return 1; // after
                } else {
                    return 0; // equal
                }
            }/*,
            state: {
                firstPage: 1,
                pageSize: 5
            },
            queryParams: {
                currentPage: "page",
                pageSize: "page_size"
            }*/
        });

        var API = {
            questionCollection: function (searchQuery) {
                var questions = new Question.Collection();
                var defer = $.Deferred();

                // If searchQuery exists, set the GET param 'search'
                var searchParam = searchQuery ?
                    $.param({search: searchQuery})
                    : {};

                questions.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    },
                    data: searchParam
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
                    error: function (data, response) {
                        if (data.validationError) {
                            defer.reject(data.validationError);
                        } else {
                            defer.reject(response.responseJSON);
                        }
                    }
                })) {
                    defer.reject(question.validationError);
                }
                return defer.promise();
            }
        };
        App.reqres.setHandler('question:collection', function (searchQuery) {
            return API.questionCollection(searchQuery);
        });

        App.reqres.setHandler('question:model', function (id) {
            return API.questionGet(id);
        });

        App.reqres.setHandler('question:add', function (data) {
            return API.questionAdd(data);
        });
    });
});
