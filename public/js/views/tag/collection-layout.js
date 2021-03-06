define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/tag/collection-layout.tpl'
], function (
    App,
    Marionette,
    Backbone,
    CollectionLayoutTpl
) {
    App.Tag.Views.CollectionLayout = Marionette.LayoutView.extend({
        tagname: 'div',
        className: 'row',
        template: CollectionLayoutTpl,
        regions: {
            collectionRegion: '#collection-region',
            paginatorRegion: '#paginator-region'
        }
    });

    return App.Tag.Views.CollectionLayout;
});
