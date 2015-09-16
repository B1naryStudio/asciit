define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/folder/layout.tpl'
], function (
    App,
    Marionette,
    Backbone,
    LayoutTpl
) {
    App.Folder.Views.CollectionLayout = Marionette.LayoutView.extend({
        tagname: 'div',
        className: 'row',
        template: LayoutTpl,
        regions: {
            newFolderRegion: '#new-folder-region',
            foldersRegion: '#folders-region',
            paginationRegion: '#pagination-region'
        }
    });

    return App.Folder.Views.CollectionLayout;
});