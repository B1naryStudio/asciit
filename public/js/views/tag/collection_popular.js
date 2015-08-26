define([
    'app',
    'tpl!views/templates/tag/collection_popular.tpl',
    'tpl!views/templates/tag/view_row_popular.tpl'
], function (App, TagsTpl, TagTpl) {
    App.module('Tag.Views', function (View, App, Backbone, Marionette, $, _) {
        View.TagCollectionPopularRow = Marionette.ItemView.extend({
            tagName: 'li',
            template: TagTpl
        });

        View.TagsPopular = Marionette.CompositeView.extend({
            tagName: 'div',
            template: TagsTpl,
            childView: View.TagCollectionPopularRow,
            childViewContainer: '.list'
        });
    });
    return App.Tag.Views.TagsPopular;
});
