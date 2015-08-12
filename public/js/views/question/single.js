define([
    'app',
    'tpl!views/templates/question/question-layout.tpl',
    'views/answer/composite',
    'views/tag/view',
    'models/vote',
    'views/vote/composite',
    'stickit',
    'highlight'
], function (App, QuestionLayoutTpl, AnswersCompositeView, TagView, Vote, VotesCompositeView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            id: 'question-view',
            template: QuestionLayoutTpl,
            regions: {
                answersRegion: '#answers-region',
                tag: '.tags',
                votes: '.votes'
            },
            onShow: function () {
                var self = this;
                $.when(App.request('tag:reset', this.model.get('tags'))).done(function (tags) {
                    self.getRegion('tag').show(new TagView({ collection: tags }));
                });

                var votes = new Vote.Collection(this.model.get('votes'));
                var votesView = new VotesCompositeView({
                    collection: votes,
                    q_and_a_id: this.model.id
                });
                this.getRegion('votes').show(votesView);

                // Highligting code-snippets
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            }
        });
    });
    return App.Question.Views.QuestionLayout;
});