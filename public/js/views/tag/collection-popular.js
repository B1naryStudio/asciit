define([
    'app',
    'tpl!views/templates/tag/collection-popular.tpl',
    'tpl!views/templates/tag/view-row-popular.tpl',
    'views/empty'
], function (App, TagsTpl, TagTpl, EmptyView) {
    App.module('Tag.Views', function (View, App, Backbone, Marionette, $, _) {
        View.TagCollectionPopularRow = Marionette.ItemView.extend({
            tagName: 'li',
            template: TagTpl
        });

        View.TagsPopular = Marionette.CompositeView.extend({
            tagName: 'div',
            template: TagsTpl,
            childView: View.TagCollectionPopularRow,
            childViewContainer: '.list',
            emptyView: EmptyView
        });
    });
    return App.Tag.Views.TagsPopular;
});
