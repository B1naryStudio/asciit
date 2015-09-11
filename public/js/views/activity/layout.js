define([
    'app',
    'tpl!views/templates/activity/layout.tpl',
    'marionette'
], function (App, LayoutTpl, Marionette) {
    App.Activity.Views.CollectionLayout = Marionette.LayoutView.extend({
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
    return App.Activity.Views.CollectionLayout;
});
