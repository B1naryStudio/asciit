define([
    'app',
    'models/vote',
    'tpl!views/templates/vote/votes.tpl',
], function (App, Vote, VotesTpl) {
    App.module('Vote.Views', function (Views, App, Backbone, Marionette, $, _) {
        Views.VotesCompositeView = Marionette.CompositeView.extend({
            template: VotesTpl,
            ui: {
                likeButton:    '.like',
                dislikeButton: '.dislike'
            },
            events: {
                'click @ui.likeButton':    'onLike',
                'click @ui.dislikeButton': 'onDislike'
            },

            onLike: function () {},
            onDislike: function () {},

            initialize: function () {
                this.model = new Vote.Model();
            },

            render: function () {
                var self = this;

                var rating = this.collection.where({sign: 1}).length
                    - this.collection.where({sign: 0}).length;

                this.$el.html(this.template({
                    rating: rating
                }));
            }
        });
    });

    return Vote.Views.VotesCompositeView;
});