define(['app'], function(App) {
    App.module('ViewsMixins', function(ViewsMixins, App, Backbone, Marionette, $, _) {
        ViewsMixins.ContainsVotes = {
            showVotes: function () {
                var vote = this.model.get('vote');
                var self = this;

                require(['views/vote/single'], function(VotesView) {
                    var votesView = new VotesView({
                        vote: vote,
                        likes: self.model.get('vote_likes'),
                        dislikes: self.model.get('vote_dislikes'),
                        q_and_a_id: self.model.id
                    });

                    self.getRegion('votes').show(votesView);
                });

                this.listenTo(this.model, 'change:vote_value', function() {
                    this.showVotes();
                });
            }
        }
    });

    return App.ViewsMixins;
});
