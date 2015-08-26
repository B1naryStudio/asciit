define([
    'app',
    'tpl!views/templates/question/collection-layout.tpl'
], function (App, CollectionLayoutTpl) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.CollectionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            className: 'row',
            template: CollectionLayoutTpl,
            regions: {
                collectionRegion: '#collection-region',
                paginatorRegion: '#paginator-region',
                tagsRegion: '#tags-region'
            }
        });
    });
    return App.Question.Views.CollectionLayout;
});
