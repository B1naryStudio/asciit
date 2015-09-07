define([
    'app',
    'tpl!views/templates/answer/row-by-user.tpl',
    'views/empty',
    'views/view-behaviors/contains-votes',
    'views/view-behaviors/code-highlighter',
    'models/tag'
], function (App, AnswerTpl, EmptyView, ContainsVotes,CodeHighlighter) {
    App.module('Answer.Views', function (View, App, Backbone, Marionette, $, _) {
        View.AnswerCollectionByUserRow = Marionette.LayoutView.extend(
            {
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
            }
        );

        View.Answers = Marionette.CollectionView.extend({
            tagName: 'div',
            id: 'answer-list',
            className: 'answers-list my-answers',
            childViewContainer: '.list',
            childView: View.AnswerCollectionByUserRow,
            emptyView: EmptyView
        });
    });
    return App.Answer.Views.Answers;
});
