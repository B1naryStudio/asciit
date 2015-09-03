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

                    var votesRegion = self.getRegion('votes');
                    votesRegion.empty();
                    votesRegion.show(votesView);
                });
            }
        };

        ViewsMixins.Editable = {
            events: {
                'mouseover @ui.itemArea': 'showControls',
                'mouseout @ui.itemArea': 'hideControls'
            },
            showControls: function () {
                if (
                    this.model.isCurrentUserOwner()
                    || App.User.Current.isAdmin()
                ) {
                    this.ui.entryControls.show();
                }

            },
            hideControls: function () {
                this.ui.entryControls.hide();
            }
        };

        ViewsMixins.ServerValidation = {
            onDataInvalid: function (errors) {
                for (var field in errors) {
                    if (!errors.hasOwnProperty(field)) {
                        continue;
                    }
                    Backbone.Validation.callbacks.invalid(
                        this,
                        field,
                        errors[field]
                    );
                }
            }
        }
    });

    return App.ViewsMixins;
});
