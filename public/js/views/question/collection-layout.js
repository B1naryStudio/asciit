define([
    'app',
    'tpl!views/templates/question/collection-layout.tpl',
    'marionette'
], function (App, CollectionLayoutTpl, Marionette) {
    App.Question.Views.CollectionLayout = Marionette.LayoutView.extend({
        tagname: 'div',
        className: 'row',
        template: CollectionLayoutTpl,
        regions: {
            collectionRegion: '#collection-region',
            paginatorRegion: '#paginator-region',
            tagsRegion: '#tags-region'
        }
    });
    return App.Question.Views.CollectionLayout;
});
