define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/question/row-by-user.tpl',
    'views/tag/view',
    'views/view-behaviors/code-highlighter',
    'models/tag',
    'syphon'
], function (
    App,
    Marionette,
    Backbone,
    QuestionTpl,
    TagView,
    CodeHighlighter
) {
    App.Question.Views.QuestionCollectionRow = Marionette.LayoutView.extend({
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

    return App.Question.Views.QuestionCollectionRow;
});