define([
    'app',
    'tpl!views/templates/question/collection-layout.tpl',
    'views/question/collection',
    'views/question/paginator'
], function (App, CollectionLayoutTpl, CollectionView, PaginatorView) {
    App.module('Collection.Views', function (View, App, Backbone, Marionette, $, _) {
        View.CollectionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            template: CollectionLayoutTpl,
            regions: {
                'collectionRegion': '#collection-region',
                'paginatorRegion': '#paginator-region'
            }
        });
    });
    return App.Collection.Views.CollectionLayout;
});
