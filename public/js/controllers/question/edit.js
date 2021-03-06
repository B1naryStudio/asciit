define([
    'app',
    'marionette',
    'backbone',
    'views/question/form',
    'views/folder/select',
    'views/tag/select',
    'models/question',
    'models/folder',
    'models/tag'
], function (
    App,
    Marionette,
    Backbone,
    QuestionFormView,
    SelectFolderView,
    SelectTagView
) {
    var Controller = Marionette.Controller.extend({
        execute: function (model) {
            $.when(
                App.request('folder:collection'),
                App.request('tag:collection', {
                    type: 'search',
                    page_size: 10
                })
            ).done(function (folders, tags) {
                var folderView = new SelectFolderView({
                    collection: folders,
                    selected: model.get('folder').title
                });

                var selectedTags = _.pluck(model.get('tags'), 'title');

                var tagView = new SelectTagView({
                    collection: tags,
                    selected: selectedTags
                });

                var view = new QuestionFormView({
                    model: model,
                    folder_view: folderView,
                    tag_view: tagView
                });

                App.trigger('popup:show', {
                    header: {
                        title: i18n.t('questions.edit-title')
                    },
                    class: 'question-form',
                    contentView: view
                });

                App.Question.Controllers.Edit.listenTo(
                    view,
                    'form:submit',
                    function (model) {
                        $.when(App.request('question:update', model))
                            .done(function () {
                                // Listened by QuestionLayout view
                                App.trigger('question:updated', model);
                                App.trigger('popup:close');
                            }).fail(function (errors) {
                                view.triggerMethod('model:invalid', errors);
                            }
                        );
                    }
                );
            });
        }
    });
    App.Question.Controllers.Edit = new Controller();

    return App.Question.Controllers.Edit;
});
