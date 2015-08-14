define([
    'app',
    'views/question/collection',
    'views/question/collection_layout',
    'views/question/paginator',
    'views/question/single',
    'views/question/add',
    'views/folder/select',
    'views/answer/composite',
    'views/tag/select',
    'views/tag/collection',
    'models/answer',
    'views/comment/composite',
    'models/comment',
    'models/question',
    'models/folder',
    'models/tag'
], function (App, CollectionView, CollectionLayout, PaginatorView, SingleView,
             AddView, SelectFolderView, AnswersCompositeView, SelectTagView,
             TagsView, Answer, CommentsCompositeView, Comment) {
    App.module('Question', function (Question, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            questions: function (searchQuery, searchTag) {
                $.when(
                    App.request('question:collection', searchQuery, searchTag),
                    App.request('tag:collection', { type: 'popular', page_size: 10 })
                ).done(function (questions, tags) {
                        var questionsView = new CollectionView({
                            collection: questions.sort(),
                            searchQuery: searchQuery,
                            searchTag: searchTag
                        });
                        var paginatorView = new PaginatorView({ collection: questions });
                        var tagsView = new TagsView({
                            collection: tags
                        });
                        var collectionLayout = new CollectionLayout();
                        App.Main.Layout.getRegion('content').show(collectionLayout);
                        collectionLayout.getRegion('collectionRegion').show(questionsView);
                        collectionLayout.getRegion('paginatorRegion').show(paginatorView);
                        collectionLayout.getRegion('tagsRegion').show(tagsView);

                        //$('#spinner').removeClass('bar');

                    // Updating for search
                    Question.Controller.listenTo(questionsView, 'form:submit', function (searchQuery) {
                        if (/tag\:(.+)/.test(searchQuery)) {
                            var query = searchQuery.replace(/tag\:(.+)/, '$1');
                            questionsView.options.searchQuery = '';
                            Backbone.history.navigate('/tags/' + query, {trigger: true});
                        } else {
                            questionsView.options.searchTag = '';
                            Backbone.history.navigate('/questions?' + searchQuery, {trigger: true});
                        }
                    });
                });
            },

            question: function (id) {
                $.when(
                    App.request('question:model', id),
                    App.request('answer:collection', id)
                ).done(function (question, answers) {
                    // New question layout
                    var questionView = new SingleView({model: question});
                    App.Main.Layout.getRegion('content').show(questionView);

                    // New answer model for saving a new answer
                    var model = new  Answer.Model({
                        question_id: id,
                        count: answers.length
                    });

                    // New answers view
                    var answersView = new AnswersCompositeView({model: model, collection: answers});
                    questionView.answersRegion.show(answersView);

                    Question.Controller.listenTo(answersView, 'form:submit', function (model) {
                        $.when(App.request('answer:add', model))
                            .done(function (savedModel) {
                                answers.push(savedModel);

                                // Add model and form clearing
                                var freshModel = new Answer.Model({
                                    question_id: id,
                                    count: answers.length
                                });

                                answersView.triggerMethod('model:refresh', freshModel);
                            }).fail(function (errors) {
                                answersView.triggerMethod('model:invalid', errors);
                            });
                    });

                        // New comments to question view
                        var commentModel = new Comment.Model({
                            q_and_a_id: id
                        });

                        var collectionComments = new Comment.Collection(question.attributes.comment);
                        var commentsView = new CommentsCompositeView({model: commentModel, collection: collectionComments, id: id});
                        questionView.commentsRegion.show(commentsView);

                        Question.Controller.listenTo(commentsView, 'form:submit', function (model) {

                            $.when(App.request('comment:add', model))
                                .done(function (savedModel) {
                                    collectionComments.push(savedModel);
                                    // Add model and form clearing
                                    var newModel = new Comment.Model({
                                        q_and_a_id: id
                                    });

                                    commentsView.triggerMethod('model:refresh', newModel);
                                }).fail(function (errors) {
                                    //console.log(errors);
                                    commentsView.triggerMethod('data:invalid', errors);
                                });
                        });
                });
            },

            add: function () {
                $.when(App.request('folder:collection')).done(function (folders) {
                    $.when(App.request('tag:collection', { type: 'select', page_size: 10 })).done(function (tags) {
                        var folder_view = new SelectFolderView({collection: folders});
                        var tag_view = new SelectTagView({collection: tags});
                        var view = new AddView({
                            folder_view: folder_view,
                            tag_view: tag_view
                        });
                        App.trigger('popup:show', {
                            header: {
                                title: 'Add new question'
                            },
                            class: 'question-add',
                            contentView: view
                        });

                        Question.Controller.listenTo(view, 'form:submit', function (data) {
                            $.when(App.request('question:add', data)).done(function (model) {
                                App.trigger('popup:close');
                                App.trigger('questions:list');
                            }).fail(function (errors) {
                                view.triggerMethod('data:invalid', errors);
                            });
                        });
                    });
                });
            }
        });

        Question.Controller = new Controller();
    });
    return App.Question.Controller;
});
