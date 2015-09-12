define([
    'app',
    'views/question/form',
    'views/folder/select',
    'views/tag/select',
    'models/question',
    'models/folder',
    'models/tag'
], function (
    App,
    QuestionFormView,
    SelectFolderView,
    SelectTagView
) {
    App.module('Question.ControllerOptions', function (ControllerOptions, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            execute: function (model) {
                $.when(
                    App.request('folder:collection'),
                    App.request('tag:collection', {
                        type: 'search',
                        page_size: 10
                    })
                ).done(function (folders, tags) {
                        var folder_view = new SelectFolderView({
                            collection: folders,
                            selected: model.get('folder').title
                        });

                        var selectedTags = _.pluck(model.get('tags'), 'title');

                        var tag_view = new SelectTagView({
                            collection: tags,
                            selected: selectedTags
                        });

                        var view = new QuestionFormView({
                            model: model,
                            folder_view: folder_view,
                            tag_view: tag_view
                        });

                        App.trigger('popup:show', {
                            header: {
                                title: i18n.t('questions.edit-title')
                            },
                            class: 'question-form',
                            contentView: view
                        });

                        ControllerOptions.Edit.listenTo(
                            view,
                            'form:submit',
                            function (model) {
                                $.when(App.request('question:update', model))
                                    .done(function () {
                                        App.trigger('popup:close');
                                        Backbone.history.navigate(
                                            '/questions/' + model.get('id'),
                                            { trigger: true }
                                        );
                                    }).fail(function (errors) {
                                        view.triggerMethod('model:invalid', errors);
                                    }
                                );
                            }
                        );
                    }
                );
            }
        });
        ControllerOptions.Edit = new Controller();
    });
    return App.Question.ControllerOptions.Edit;
});
