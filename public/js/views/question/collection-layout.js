define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/question/collection-layout.tpl'
], function (
    App,
    Marionette,
    Backbone,
    CollectionLayoutTpl
) {
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
