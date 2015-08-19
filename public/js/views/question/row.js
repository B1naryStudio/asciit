define([
    'app',
    'tpl!views/templates/question/row.tpl',
    'views/tag/view',
    'models/tag',
    'syphon'
], function (App, QuestionTpl, TagView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionCollectionRow = Marionette.LayoutView.extend({
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
                                collection: tags,
                                searchTag: self.options.searchTag ?
                                    self.options.searchTag() : ''
                            }));
                    });

                // Highligting code-snippets
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            }
        });
    });
    return App.Question.Views.QuestionCollectionRow;
});
