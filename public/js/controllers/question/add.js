define([
    'app',
    'views/question/add',
    'views/folder/select',
    'views/tag/select',
    'marionette',
    'models/question',
    'models/folder',
    'models/tag'
], function (
    App,
    AddView,
    SelectFolderView,
    SelectTagView,
    Marionette
) {
    var Controller = Marionette.Controller.extend({
        execute: function () {
            $.when(
                App.request('folder:collection'),
                App.request('tag:collection', {
                    type: 'search',
                    page_size: 10
                })
            ).done(function (folders, tags) {
                    var folder_view = new SelectFolderView({
                        collection: folders
                    });
                    var tag_view = new SelectTagView({
                        collection: tags
                    });
                    var view = new AddView({
                        folder_view: folder_view,
                        tag_view: tag_view
                    });
                    App.trigger('popup:show', {
                        header: {
                            title: i18n.t('questions.add-title')
                        },
                        class: 'question-add',
                        contentView: view
                    });

                    App.Question.Controllers.Add.listenTo(
                        view,
                        'form:submit',
                        function (model) {
                            $.when(App.request('question:add', model))
                                .done(function () {
                                    App.trigger('popup:close');
                                    App.trigger('questions:list');
                                }).fail(function (errors) {
                                    view.triggerMethod('data:invalid', errors);
                                }
                            );
                        }
                    );
                });
        }
    });
    App.Question.Controllers.Add = new Controller();

    return App.Question.Controllers.Add;
});
