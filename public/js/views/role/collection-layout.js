define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/role/collection-layout.tpl'
], function (
    App,
    Marionette,
    Backbone,
    CollectionLayoutTpl
) {
    App.User.Views.CollectionLayout = Marionette.LayoutView.extend({
        tagname: 'div',
        className: 'users-layout',
        template: CollectionLayoutTpl,
        regions: {
            collectionRegion: '#collection-region',
            paginatorRegion: '#paginator-region'
        }
    });

    return App.User.Views.CollectionLayout;
});
