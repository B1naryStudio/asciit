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
                'click .update-folder': 'updateFolder',
                'click .cancel-update': 'cancelUpdate',
            },

            deleteFolder: function() {
                this.trigger('submit:deleteFolder', this.model);
            },

            editFolder: function() {
                this.model.attributes.oldValue = $(this.el).find('[name="name"]').val();
                App.helper.controllButtons(this.el, false);
            },

            cancelUpdate: function() {
                this.model.isValid(true);
                $(this.el).find('[name="name"]').val(this.model.attributes.oldValue);
                App.helper.controllButtons(this.el, true);
            },

            updateFolder: function(e) {
                this.model.attributes.title = $(this.el).find('[name="name"]').val();
                if(this.model.isValid(true)) {
                    this.trigger('folder:update', this.model);
                }
            },

            bindings: {
                '[name=name]': {
                    observe: 'title',
                    setOptions: {
                        validate: true
                    }
                }
            },

            initialize: function () {
                Backbone.Validation.bind(this);
            },

            onRender: function() {
                this.stickit(this.model);
                return this;
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
