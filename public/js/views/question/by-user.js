define([
    'app',
    'tpl!views/templates/question/row-by-user.tpl',
    'views/tag/view',
    'models/tag'
], function (App, QuestionTpl, TagView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionCollectionByUserRow = Marionette.LayoutView.extend({
            tagName: 'div',
            className: 'question-row',
            template: QuestionTpl,
            regions: {
                tag: '.tags'
            },
            onShow: function () {
                var self = this;
                $.when(App.request('tag:reset', this.model.attributes.tags))
                    .done(function (tags) {
                        self.getRegion('tag')
                            .show(new TagView({
                                collection: tags
                            }));
                    });

                // Highligting code-snippets
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            }
        });

        View.Questions = Marionette.CollectionView.extend({
            tagName: 'div',
            id: 'question-list',
            className: 'questions-list my-questions',
            childViewContainer: '.list',
            childView: View.QuestionCollectionByUserRow
        });
    });
    return App.Question.Views.Questions;
});
