define(['app', 'tpl!views/templates/tag/collection.tpl',
    'tpl!views/templates/tag/row.tpl'
], function (App, TagsTpl, TagTpl) {
    App.module('Tag.Views', function (View, App, Backbone, Marionette, $, _) {
        View.TagCollectionRow = Marionette.ItemView.extend({
            tagName: 'div',
            template: TagTpl
        });

        View.Tags = Marionette.CompositeView.extend({
            tagName: 'div',
            className: 'row',
            template: TagsTpl,
            childView: View.TagCollectionRow,
            childViewContainer: '.list'
        });
    });
    return App.Tag.Views.Tags;
});
