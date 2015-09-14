define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/folder/add.tpl'
], function (
    App,
    Marionette,
    Backbone,
    NewFolderTpl
) {
    App.Folder.Views.NewFolderView = Marionette.ItemView.extend({
        tagName: 'div',
        id: 'new-folder-form',
        template: NewFolderTpl,

        events: {
            'submit .folders-form': 'saveFolder'
        },

        saveFolder: function (event) {
            event.preventDefault();

            if (!this.model.validationError) {
                this.trigger('form:submit', this.model);
            }
        },

        bindings: {
            '#title': {
                observe: 'title',
                setOptions: {
                    validate: true
                }
            }
        },

        onRender: function() {
            this.stickit(this.model);
            return this;
        },

        initialize: function () {
            Backbone.Validation.bind(this);
        },

        onModelRefresh: function (newModel) {
            this.unstickit();
            this.model = newModel;
            this.stickit();
            Backbone.Validation.bind(this);
        }
    });

    return App.Folder.Views.NewFolderView;
});
