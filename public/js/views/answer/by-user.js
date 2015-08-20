define([
    'app',
    'tpl!views/templates/answer/row-by-user.tpl',
    'views/tag/view',
    'views/views-mixins',
    'models/tag'
], function (App, AnswerTpl, ViewsMixins, TagView) {
    App.module('Answer.Views', function (View, App, Backbone, Marionette, $, _) {
        View.AnswerCollectionByUserRow = Marionette.LayoutView.extend(
            _.extend({}, ViewsMixins.ContainsVotes, {
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
                },
                initialize: function () {
                    this.listenTo(this.model, 'change', function() {
                        this.render();
                    });
                }
            })
        );

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
