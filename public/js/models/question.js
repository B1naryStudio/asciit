define([
    'app',
    'backbone',
    'paginator',
    'models/model-mixins'
], function (
    App,
    Backbone,
    PageableCollection,
    ModelMixins
) {
    App.Question.Models.Model = Backbone.Model.extend(
        _.extend(
            {},
            ModelMixins.RelativeTimestampsModel,
            ModelMixins.LiveModel,
            ModelMixins.Votable,
            ModelMixins.Ownership,
            {
                urlRoot: App.prefix + '/api/v1/questions',
                validation: {
                    title: {
                        required: true,
                        msg: i18n.t('validation.required-field')
                    },
                    description: {
                        required: true,
                        msg: i18n.t('validation.required-field')
                    },
                    folder: {
                        required: true,
                        msg: i18n.t('validation.required-field')
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

    App.Question.Models.Collection = PageableCollection.extend(
        _.extend({}, ModelMixins.LiveCollection, {
            model: App.Question.Models.Model,
            url: App.prefix + '/api/v1/questions',
            liveURI: 'questions',
            sortKey: 'updated_at',
            order: 'desc',

            comparator: function (model1, model2) {
                var compareField = this.sortKey;

                if (model1.get(compareField) > model2.get(compareField)) {
                    return -1; // before
                } else if (
                    model2.get(compareField) > model1.get(compareField)
                ) {
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
                    return this.options.searchQuery;
                },
                orderBy: function () {
                    return this.sortKey;
                },
                tag: function () {
                    return this.options.searchTag;
                },
                folder: function () {
                    return this.options.searchFolder;
                },
                sortedBy: 'desc'
            },

            initialize: function (options) {
                this.options = options;
                this.sort();

                this.startLiveUpdating();
            }
        })
    );

    App.Question.Models.CollectionByUser = PageableCollection.extend(
        _.extend({}, ModelMixins.LiveCollection, {
            model: App.Question.Models.Model,
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
                } else if (
                    model2.get(compareField) > model1.get(compareField)
                ) {
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
            initialize: function (options) {
                this.sort();
                this.startLiveUpdating();
            }
        })
    );

    var API = _.extend({}, ModelMixins.API, {
        notFoundChecker: function (data, xhr, options) {
            options.defer.reject({status: xhr.status});
        },

        questionCollection: function (data) {
            var options = data.options ? data.options : {};
            delete data.options;

            var questions = new App.Question.Models.Collection({
                searchQuery: data.searchQuery,
                searchTag: data.searchTag,
                searchFolder: data.searchFolder
            }, options);

            return this.deferOperation('fetch', questions);
        },

        questionGet: function (id) {
            var question = new App.Question.Models.Model({ id: id });
            return this.deferOperation('fetch', question, [], {
                error: this.notFoundChecker
            });
        },

        questionCollectionByUser: function () {
            var questions = new App.Question.Models.CollectionByUser();
            return this.deferOperation('fetch', questions);

        }
    });

    App.reqres.setHandler('question:collection', function (data) {
        return API.questionCollection(data);
    });

    App.reqres.setHandler('question:model', function (id) {
        return API.questionGet(id);
    });

    App.reqres.setHandler('question:add', function (model) {
        return API.deferOperation('save', model);
    });

    App.reqres.setHandler('question:update', function (model) {
        return API.deferOperation('save', model);
    });

    App.reqres.setHandler('question:delete', function (model) {
        return API.deferOperation('destroy', model);
    });

    App.reqres.setHandler('question:my', function () {
        return API.questionCollectionByUser();
    });

    return App.Question.Models;
});
