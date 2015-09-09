define(['app', 'views/vote/single'], function(App, VotesView) {
    App.module('Behaviors', function (Behaviors, App, Backbone, Marionette, $, _) {
        Behaviors.ContainsVotes = Marionette.Behavior.extend({
            defaults: {
                votesRegion: 'votes'
            },

            modelEvents: {
                "change:vote_value": "showVotes"
            },

            onShow: function () {
                this.showVotes();
            },

            showVotes: function () {
                var vote = this.view.model.get('vote');

                var votesView = new VotesView({
                    vote:       vote,
                    likes:      this.view.model.get('vote_likes'),
                    dislikes:   this.view.model.get('vote_dislikes'),
                    q_and_a_id: this.view.model.id
                });

                var votesRegion = this.view.getRegion(this.options.votesRegion);
                votesRegion.empty();
                votesRegion.show(votesView);
            }
        });
    });

    return App.Behaviors.ContainsVotes;
});