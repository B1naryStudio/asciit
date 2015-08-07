define(['app', 'tpl!views/templates/tag/view-row.tpl', 'syphon'], function (App, Tpl) {
    App.module('Tag.Views', function (View, App, Backbone, Marionette, $, _) {
        View.TagViewCollectionRow = Marionette.ItemView.extend({
            tagName: 'li',
            template: Tpl
        });

        View.TagsView = Marionette.CollectionView.extend({
            tagName: 'ul',
            childView: View.TagViewCollectionRow
        });
    });
    return App.Tag.Views.TagsView;
});