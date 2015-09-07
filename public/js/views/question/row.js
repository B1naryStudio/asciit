define([
    'app',
    'tpl!views/templates/question/row.tpl',
    'views/tag/view',
    'models/tag',
    'views/view-behaviors/code-highlighter',
    'syphon'
], function (App, QuestionTpl, TagView, CodeHighlighter) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionCollectionRow = Marionette.LayoutView.extend({
            tagName: 'div',
            className: 'question-row',
            template: QuestionTpl,
            regions: {
                tag: '.tags'
            },
            behaviors: {
                CodeHighlighter: {
                    behaviorClass: CodeHighlighter
                }
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
                            })
                        );
                    }
                );
            },
            initialize: function () {
                this.listenTo(this.model, 'change', function() {
                    this.render();
                });
            }
        });
    });
    return App.Question.Views.QuestionCollectionRow;
});
