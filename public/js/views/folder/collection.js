define([
    'app',
    'tpl!views/templates/folder/row.tpl',
    'views/folder/confirm'
], function (App, FolderRowTpl, confirmView) {
    App.module('Folder.Views', function (Views, App, Backbone, Marionette, $, _ ) {
        Views.SingleFolder = Marionette.ItemView.extend({
            tagName: 'div',
            className: 'folder-row',
            template: FolderRowTpl,

            events: {
                'click .delete-folder': 'deleteFolder',
                'click .edit-folder': 'editFolder',
                'click .update-folder': 'updateFolder',
                'click .cancel-update': 'cancelUpdate'
            },

            deleteFolder: function() {
                var popupConfirm = new confirmView();
                App.trigger('popup:show', {
                    header: {
                        title: i18n.t('folders.confirm-title')
                    },
                    class: 'confirm-form',
                    contentView: popupConfirm
                });
                this.listenTo(
                    popupConfirm,
                    'form:submit',
                    function () {
                        this.trigger('submit:delete', this.model);
                    }
                )
            },

            editFolder: function () {
                var title = this.$el.find('[name="title"]');
                this.model.set('oldValue', title.val());
                App.helper.controllButtons(this.$el, false);
                title.focus();
            },

            cancelUpdate: function () {
                this.model.isValid(true);
                this.$el.find('[name="title"]').val(this.model.get('oldValue'));
                App.helper.controllButtons(this.$el, true);
            },

            updateFolder: function (e) {
                e.preventDefault();

                if (!this.model.validationError) {
                    this.trigger('submit:update', this.model);
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

            initialize: function () {
                Backbone.Validation.bind(this);
            },

            onRender: function() {
                this.stickit();
                return this;
            }

        });

        Views.Folders = Marionette.CollectionView.extend({
            tagName: 'div',
            id: 'folders-list',
            className: 'folders-list',
            childViewContainer: '.folders-region',
            childView: Views.SingleFolder
        });
    });
    return App.Folder.Views.Folders;
});
