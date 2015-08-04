define(['app',
    'views/question/collection',
    'views/question/single',
    'views/question/add',
    'views/folder/select',
    'models/question',
    'models/folder'
], function (App, CollectionView, SingleView, AddView, SelectFolderView) {
    App.module('Question', function (Question, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            questions: function () {
                $.when(App.request('question:collection')).done(function (questions) {
                    var view = new CollectionView.Questions({collection: questions});
                    App.Main.Layout.getRegion('content').show(view);
                });
            },
            question: function (id) {
                $.when(App.request('question:model', id)).done(function (question) {
                    var view = new SingleView({ model: question });
                    App.Main.Layout.getRegion('content').show(view);
                });
            },
            add: function () {
                $.when(App.request('folder:collection')).done(function (folders) {
                    var folder_view = new SelectFolderView({ collection: folders });
                    var view = new AddView({ folder_view: folder_view });
                    App.trigger('popup:show', {
                        header: {
                            title: 'Add new question'
                        },
                        class: 'question-add',
                        contentView: view
                    });

                    var self = this;

                    Question.Controller.listenTo(view, 'form:submit', function (data) {
                        $.when(App.request('question:add', data)).done(function (model) {
                            App.trigger('popup:close');
                            if (Backbone.history.navigate('/', { trigger: true })) {
                                self.questions();
                            }
                        }).fail(function (errors) {
                            view.triggerMethod('data:invalid', errors);
                        });
                    });
                });
            }
        });
        Question.Controller = new Controller();
    });
    return App.Question.Controller;
});
