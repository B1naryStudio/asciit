define([
    'app',
    'tpl!views/templates/question/question-layout.tpl',
    'views/answer/composite',
    'views/tag/view',
    'models/vote',
    'views/vote/composite',
    'stickit',
    'highlight'
], function (App, QuestionLayoutTpl, AnswersCompositeView, TagView, Vote, VotesView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionLayout = Marionette.LayoutView.extend({
            tagname: 'div',
            id: 'question-view',
            template: QuestionLayoutTpl,
            regions: {
                answersRegion: '#answers-region',
                commentsRegion: '#comments-region',
                tag: '.tags',
                votes: '.votes'
            },

            events: {
                'click .show-form' : 'showForm'
            },

            showForm: function(e) {
                e.stopPropagation();
                var el = $(e.target)
                    .parents('.question_view')
                    .siblings('#comments-region')
                    .find('section .comment-form');
                el.toggle();
                $(e.target).toggleClass('form-open');
                el.find('textarea').focus();
            },

            onShow: function () {
                var self = this;
                $.when(App.request('tag:reset', this.model.get('tags')))
                    .done(function (tags) {
                        self.getRegion('tag')
                            .show(new TagView({
                                collection: tags
                            }));
                });

                var vote = this.model.get('vote');
                var votesView = new VotesView({
                    vote: vote,
                    likes: this.model.get('vote_likes'),
                    dislikes: this.model.get('vote_dislikes'),
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