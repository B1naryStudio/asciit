define([
    'app',
    'tpl!views/templates/answer/row-by-user.tpl',
    'views/empty',
    'views/views-mixins',
    'marionette',
    'views/view-behaviors/contains-votes',
    'views/view-behaviors/code-highlighter',
    'models/tag'
], function (
    App,
    AnswerTpl,
    EmptyView,
    ViewsMixins,
    Marionette,
    ContainsVotes,
    CodeHighlighter
) {
    App.Answer.Views.AnswerCollectionByUserRow = Marionette.LayoutView.extend({
        tagName: 'div',
        className: 'answer-row',
        template: AnswerTpl,
        regions: {
            tag: '.tags'
        },
        behaviors: {
            ContainsVotes: {
                behaviorClass: ContainsVotes
            },
            CodeHighlighter: {
                behaviorClass: CodeHighlighter
            }
        },
        initialize: function () {
            this.listenTo(this.model, 'change', function() {
                this.render();
            });
        }
    });

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
