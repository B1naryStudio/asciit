define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/activity/layout.tpl'
], function (
    App,
    Marionette,
    Backbone,
    LayoutTpl
) {
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
