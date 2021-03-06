define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/answer/row-by-user.tpl',
    'views/empty',
    'views/view-behaviors/contains-votes',
    'views/view-behaviors/code-highlighter',
    'views/view-behaviors/iframes-height',
    'models/tag'
], function (
    App,
    Marionette,
    Backbone,
    AnswerTpl,
    EmptyView,
    ContainsVotes,
    CodeHighlighter,
    IframesHeight
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
            },
            IframesHeight : {
                behaviorClass: IframesHeight
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
