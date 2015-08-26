define([
    'app',
    'tpl!views/templates/folder/select-row.tpl',
    'tpl!views/templates/folder/select.tpl',
    'select2'
], function (App, SelectRowTpl, SelectTpl) {
    App.module('Folder.Views', function (View, App, Backbone, Marionette, $, _) {
        View.FolderSelectRow = Marionette.ItemView.extend({
            tagName: 'option',
            template: SelectRowTpl,
            onRender: function () {
                this.$el.val(this.model.attributes.title);
            }
        });

        View.FolderSelect = Marionette.CompositeView.extend({
            tagName: 'select',
            className: 'folder-select',
            template: SelectTpl,
            childView: View.FolderSelectRow,
            childViewContainer: "#folder-options",

            onShow: function () {
                var self = this;
                var lang = i18n.lng();

                require(['vendor/select2/i18n/' + lang], function () {
                    self.$el.attr('name', 'folder').select2({
                        placeholder: i18n.t('folders.select'),
                        language: lang,
                        allowClear: true
                    });
                });
            }
        });
    });
    return App.Folder.Views.FolderSelect;
});
