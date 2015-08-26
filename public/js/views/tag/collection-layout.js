define([
    'app',
    'tpl!views/templates/tag/collection_layout.tpl'
], function (App, CollectionLayoutTpl) {
    App.module('Tag.Views', function (View, App, Backbone, Marionette, $, _) {
        View.CollectionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            className: 'row',
            template: CollectionLayoutTpl,
            regions: {
                collectionRegion: '#collection-region',
                paginatorRegion: '#paginator-region'
            }
        });
    });
    return App.Tag.Views.CollectionLayout;
});
