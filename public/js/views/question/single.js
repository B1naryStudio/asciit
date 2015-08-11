define([
    'app',
    'tpl!views/templates/question/question-layout.tpl',
    'views/answer/composite',
    'views/tag/view',
    'stickit',
    'highlight'
], function (App, QuestionLayoutTpl, AnswersCompositeView, TagView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            id: 'question-view',
            template: QuestionLayoutTpl,
            regions: {
                answersRegion: '#answers-region',
                tag: '.tags'
            },
            onShow: function () {
                var self = this;
                $.when(App.request('tag:reset', this.model.get('tags'))).done(function (tags) {
                    self.getRegion('tag').show(new TagView({ collection: tags }));
                });

                // Highligting code-snippets
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            }
        });
    });
    return App.Question.Views.QuestionLayout;
});