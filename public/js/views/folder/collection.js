define([
    'app',
    'tpl!views/templates/folder/folder.tpl',
    'tpl!views/templates/folder/collection.tpl',
], function (App, FolderView, CollectionView) {
    App.module('Folder.Views', function (View, App, Backbone, Marionette, $, _ ) {
        View.SingleFolder = Marionette.ItemView.extend({
            tagName: 'div',
            className: 'folder-row',
            template: FolderView,

            events: {
                'click .delete-folder': 'deleteFolder',
                'click .edit-folder': 'editFolder',
                'click .update-folder': 'updateFolder'
            },

            deleteFolder: function() {
                this.model.destroy({
                    success: function(model, responce) {
                        console.log(model)
                    },
                    error: function(model, xhr) {
                        console.log(xhr)
                    }
                })
            },

            editFolder: function() {
                $(this.el).find('[name="name"]').attr('disabled', false);
            },

            updateFolder: function() {
                this.model.attributes.title = $(this.el).find('[name="name"]').val();
                if(this.model.isValid(true)) {
                    console.log(true);
                    this.trigger('folder:update', this.model);
                } else {
                    console.log(false);
                }
            },

            bindings: {
                '[name=name]': {
                    observe: 'name',
                    setOptions: {
                        validate: true
                    }
                }
            },

            initialize: function () {
                Backbone.Validation.bind(this);
            },

        });

        View.Folders = Marionette.CompositeView.extend({
            tagName: 'div',
            id: 'folders-list',
            className: 'folders-list',
            template: CollectionView,
            childViewContainer: '.folders-region',
            childView: View.SingleFolder,

            events: {
                'submit .folders-form': 'saveFolder',
            },

            saveFolder: function(event) {
                event.preventDefault();
                if(this.model.isValid(true)) {
                    this.trigger('form:submit', this.model);
                }
            },

            bindings: {
                '[name=title]': {
                    observe: 'title',
                    setOptions: {
                        validate: true
                    }
                }
            },

            onRender: function() {
                this.stickit();
                return this;
            },

            initialize: function () {
                Backbone.Validation.bind(this);
            },

            onModelRefresh: function (newModel) {
                this.model = newModel;
                this.stickit();
            },

        });
    })
    return App.Folder.Views.Folders;
})
