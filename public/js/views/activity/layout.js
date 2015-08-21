define([
    'app',
    'tpl!views/templates/activity/layout.tpl'
], function (App, LayoutTpl) {
    App.module('Collection.Views', function (View, App, Backbone, Marionette, $, _) {
        View.CollectionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            className: 'row',
            template: LayoutTpl,
            regions: {
                questionsRegion: '#questions-region',
                questionsPaginatorRegion: '#questions-paginator-region',
                answersRegion: '#answers-region',
                answersPaginatorRegion: '#answers-paginator-region'
            }
        });
    });
    return App.Collection.Views.CollectionLayout;
});
