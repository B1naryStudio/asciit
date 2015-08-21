define([
    'app',
    'tpl!views/templates/tag/collection.tpl',
    'tpl!views/templates/tag/view-row.tpl'
], function (App, TagsTpl, TagTpl) {
    App.module('Tag.Views', function (View, App, Backbone, Marionette, $, _) {
        View.TagCollectionRow = Marionette.ItemView.extend({
            tagName: 'li',
            template: TagTpl
        });

        View.Tags = Marionette.CompositeView.extend({
            tagName: 'div',
            template: TagsTpl,
            childView: View.TagCollectionRow,
            childViewContainer: '.list'
        });
    });
    return App.Tag.Views.Tags;
});
