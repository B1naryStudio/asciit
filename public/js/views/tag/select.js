define(['app', 'tpl!views/templates/tag/select-row.tpl', 'select2'], function (App, SelectRowTpl) {
    App.module('Tag.Views', function (View, App, Backbone, Marionette, $, _) {
        View.TagSelectRow = Marionette.ItemView.extend({
            tagName: 'option',
            template: SelectRowTpl,
            onRender: function () {
                this.$el.val(this.model.attributes.title);
            }
        });

        View.TagSelect = Marionette.CollectionView.extend({
            tagName: 'select',
            className: 'tag-select',
            childView: View.TagSelectRow,
            onShow: function () {
                this.$el.attr('name', 'tag')
                    .attr('multiple', 'multiple')
                    .select2({
                        placeholder: 'Select a tag',
                        tags: true,
                        tokenSeparators: [',', ' ']
                    }).val(null).trigger('change');
            }
        });
    });
    return App.Tag.Views.TagSelect;
});
