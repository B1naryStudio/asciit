define([
    'app',
    'marionette',
    'views/vote/single'
], function (
    App,
    Marionette,
    VotesView
) {
    App.Behaviors.ContainsVotes = Marionette.Behavior.extend({
        defaults: {
            votesRegion: 'votes'
        },

        modelEvents: {
            'change:vote_value': 'showVotes'
        },

        onShow: function () {
            this.showVotes();
        },

        showVotes: function () {
            var votesRegion = this.view.getRegion(this.options.votesRegion);

            if (votesRegion) {
                var vote = this.view.model.get('vote');

                var votesView = new VotesView({
                    vote:       vote,
                    likes:      this.view.model.get('vote_likes'),
                    dislikes:   this.view.model.get('vote_dislikes'),
                    q_and_a_id: this.view.model.id
                });

                votesRegion.empty();
                votesRegion.show(votesView);
            }
        }
    });

    return App.Behaviors.ContainsVotes;
});