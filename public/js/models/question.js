define([
    'app',
    'paginator',
    'models/model-mixins'
], function(App, PageableCollection, ModelMixins) {
    App.module('Question', function(Question, App, Backbone, Marionette, $, _) {
        Question.Model = Backbone.Model.extend(
            _.extend(
                {},
                ModelMixins.RelativeTimestampsModel,
                ModelMixins.LiveModel,
                ModelMixins.Votable,
                {
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
                    },
                    answerAdd: function () {
                        this.set(
                            'answers_count',
                            this.get('answers_count') + 1
                        );
                    },
                    setupLiveUpdate: function () {
                        this.liveURI = 'entries/' + this.get('id');

                        if (this.wsSession) {
                            this.wsSession.close();
                        }

                        this.startLiveUpdating();
                    },
                    initialize: function (options) {
                        this.attachLocalDates();
                        this.on('change', this.attachLocalDates);

                        // We need a numeric id for the subscription topic name.
                        // On init may be slug only, but named as 'id', so if we
                        // have a 'slug' attribute, 'id' contains numeric id.
                        if (this.has('slug')) {
                            this.setupLiveUpdate();
                        } else {
                            this.on('sync', this.setupLiveUpdate);
                        }
                    }
                }
            )
        );

        Question.Collection = PageableCollection.extend(
            _.extend({}, ModelMixins.LiveCollection, {
                model: Question.Model,
                url: App.prefix + '/api/v1/questions',
                liveURI: 'questions',
                sortKey: 'updated_at',
                order: 'desc',

                comparator: function (model1, model2) {
                    var compareField = this.sortKey;

                    if (model1.get(compareField) > model2.get(compareField)) {
                        return -1; // before
                    } else if (model2.get(compareField) > model1.get(compareField)) {
                        return 1; // after
                    } else {
                        return 0; // equal
                    }
                },

                state: {
                    firstPage: 1,
                    pageSize: 5
                },

                queryParams: {
                    currentPage: 'page',
                    pageSize: 'page_size',
                    search: function () {
                        return this.searchQuery;
                    },
                    orderBy: function () {
                        return this.sortKey;
                    },
                    tag: function () {
                        return this.searchTag;
                    },
                    folder: function () {
                        return this.searchFolder;
                    },
                    sortedBy: 'desc'
                },

                initialize: function(options) {
                    this.searchQuery = options.searchQuery;
                    this.searchTag = options.searchTag;
                    this.searchFolder = options.searchFolder;
                    this.sort();

                    this.startLiveUpdating();
                }
            })
        );

        Question.CollectionByUser = PageableCollection.extend(
            _.extend({}, ModelMixins.LiveCollection, {
                model: Question.Model,
                url: App.prefix + '/api/v1/questions-my',
                liveURI: 'user/'
                         + App.User.Current.get('id')
                         + '/questions',
                sortKey: 'updated_at',
                order: 'desc',

                comparator: function (model1, model2) {
                    var compareField = this.sortKey;

                    if (model1.get(compareField) > model2.get(compareField)) {
                        return -1; // before
                    } else if (model2.get(compareField) > model1.get(compareField)) {
                        return 1; // after
                    } else {
                        return 0; // equal
                    }
                },
                state: {
                    firstPage: 1,
                    pageSize: 5
                },
                queryParams: {
                    currentPage: 'page',
                    pageSize: 'page_size',
                    orderBy: function () {
                        return this.sortKey;
                    },
                    sortedBy: 'desc'
                },
                initialize: function(options) {
                    this.sort();
                    this.startLiveUpdating();
                }
            })
        );

        var API = {
            questionCollection: function (searchQuery, searchTag, searchFolder) {
                var questions = new Question.Collection({
                    searchQuery: searchQuery,
                    searchTag: searchTag,
                    searchFolder: searchFolder
                });
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
                    success: function (model) {
                        defer.resolve(model);
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
            },
            questionCollectionByUser: function () {
                var questions = new Question.CollectionByUser();
                var defer = $.Deferred();

                questions.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            }
        };

        App.reqres.setHandler(
            'question:collection',
            function (searchQuery, searchTag, searchFolder) {
                return API.questionCollection(searchQuery, searchTag, searchFolder);
            }
        );

        App.reqres.setHandler('question:model', function (id) {
            return API.questionGet(id);
        });

        App.reqres.setHandler('question:add', function (data) {
            return API.questionAdd(data);
        });

        App.reqres.setHandler('question:my', function () {
            return API.questionCollectionByUser();
        });
    });
});
