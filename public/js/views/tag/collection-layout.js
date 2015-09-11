define([
    'app',
    'tpl!views/templates/tag/collection-layout.tpl',
    'marionette'
], function (App, CollectionLayoutTpl, Marionette) {
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
