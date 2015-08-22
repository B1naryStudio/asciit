define([
    'app',
    'tpl!views/templates/folder/layout.tpl'
], function (App, LayoutTpl) {
    App.module('Collection.Views', function (View, App, Backbone, Marionette, $, _) {
        View.CollectionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            className: 'row',
            template: LayoutTpl,
            regions: {
                newFolderRegion: '#new-folder-region',
                foldersRegion: '#folders-region',
                paginationRegion: '#pagination-region'
            }
        });
    });
    return App.Collection.Views.CollectionLayout;
});