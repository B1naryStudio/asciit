define([
    'app',
    'tpl!views/templates/question/row.tpl',
    'views/tag/view',
    'marionette',
    'models/tag',
    'syphon'
], function (App, QuestionTpl, TagView, Marionette) {
    App.Question.Views.QuestionCollectionRow = Marionette.LayoutView.extend({
        tagName: 'div',
        className: 'question-row',
        template: QuestionTpl,
        regions: {
            tag: '.tags'
        },
        onShow: function () {
            var self = this;
            $.when(App.request('tag:reset', this.model.get('tags')))
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
        },
        initialize: function () {
            this.listenTo(this.model, 'change', function() {
                this.render();
            });
        }
    });

    return App.Question.Views.QuestionCollectionRow;
});
