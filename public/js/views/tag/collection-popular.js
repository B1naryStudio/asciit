define([
    'app',
    'tpl!views/templates/tag/collection-popular.tpl',
    'tpl!views/templates/tag/view-row-popular.tpl',
    'views/empty',
    'marionette'
], function (App, TagsTpl, TagTpl, EmptyView, Marionette) {
    App.Tag.Views.TagCollectionPopularRow = Marionette.ItemView.extend({
        tagName: 'li',
        template: TagTpl
    });

    App.Tag.Views.TagsPopular = Marionette.CompositeView.extend({
        tagName: 'div',
        template: TagsTpl,
        childView: App.Tag.Views.TagCollectionPopularRow,
        childViewContainer: '.list',
        emptyView: EmptyView
    });

    return App.Tag.Views.TagsPopular;
});
