define([
    'app',
    'tpl!views/templates/answer/row-by-user.tpl',
    'views/tag/view',
    'models/tag'
], function (App, AnswerTpl, TagView) {
    App.module('Answer.Views', function (View, App, Backbone, Marionette, $, _) {
        View.AnswerCollectionByUserRow = Marionette.LayoutView.extend({
            tagName: 'div',
            className: 'answer-row',
            template: AnswerTpl,
            regions: {
                tag: '.tags'
            },
            onShow: function () {
                // Highligting code-snippets
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            }
        });

        View.Answers = Marionette.CollectionView.extend({
            tagName: 'div',
            id: 'answer-list',
            className: 'answers-list my-answers',
            childViewContainer: '.list',
            childView: View.AnswerCollectionByUserRow
        });
    });
    return App.Answer.Views.Answers;
});
