define([
    'app',
    'tpl!views/templates/folder/select-row.tpl',
    'select2'
], function (App, SelectRowTpl) {
    App.module('Folder.Views', function (View, App, Backbone, Marionette, $, _) {
        View.FolderSelectRow = Marionette.ItemView.extend({
            tagName: 'option',
            template: SelectRowTpl,
            onRender: function () {
                this.$el.val(this.model.attributes.title);
            }
        });

        View.FolderSelect = Marionette.CollectionView.extend({
            tagName: 'select',
            className: 'folder-select',
            childView: View.FolderSelectRow,
            onShow: function () {
                this.$el.attr('name', 'folder').select2({
                    placeholder: 'Select a folder',
                    tags: true
                });
            }
        });
    });
    return App.Folder.Views.FolderSelect;
});
