define([
    'app',
    'tpl!views/templates/answer/row-by-user.tpl',
    'views/empty',
    'views/views-mixins',
    'marionette',
    'models/tag'
], function (App, AnswerTpl, EmptyView, ViewsMixins, Marionette) {
    App.Answer.Views.AnswerCollectionByUserRow = Marionette.LayoutView.extend(
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

    App.Answer.Views.Answers = Marionette.CollectionView.extend({
        tagName: 'div',
        id: 'answer-list',
        className: 'answers-list my-answers',
        childViewContainer: '.list',
        childView: App.Answer.Views.AnswerCollectionByUserRow,
        emptyView: EmptyView
    });

    return App.Answer.Views.Answers;
});
