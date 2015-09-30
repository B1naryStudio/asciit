define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/folder/select-row.tpl',
    'tpl!views/templates/folder/select.tpl',
    'select2'
], function (
    App,
    Marionette,
    Backbone,
    SelectRowTpl,
    SelectTpl
) {
    App.Folder.Views.FolderSelectRow = Marionette.ItemView.extend({
        tagName: 'option',
        template: SelectRowTpl,
        onRender: function () {
            this.$el.val(this.model.attributes.title);
        }
    });

    App.Folder.Views.FolderSelect = Marionette.CompositeView.extend({
        tagName: 'select',
        className: 'folder-select',
        template: SelectTpl,
        childView: App.Folder.Views.FolderSelectRow,
        childViewContainer: '#folder-options',

        onShow: function () {
            var lang = i18n.lng().substr(0, 2);
            var self = this;

            require(['vendor/select2/i18n/' + lang], function () {
                var select = self.$el.attr('name', 'folder').select2({
                    placeholder: i18n.t('folders.select'),
                    language: lang,
                    allowClear: true
                });

                if (self.options.selected) {
                    select.select2('val', self.options.selected);
                }
            });
        }
    });

    return App.Folder.Views.FolderSelect;
});
