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
            ui: {
                itemArea:     '.editable-item',
                entryControls: '.entry-controls',
                editButton:  '.editable-item .entry-controls .edit',
                saveButton:  '.editable-item .entry-controls .save',
                cancelButton:  '.editable-item .entry-controls .cancel',
                deleteButton:  '.editable-item .entry-controls .delete'
            },
            events: {
                'mouseover @ui.itemArea': 'showControls',
                'mouseout @ui.itemArea': 'hideControls',
                'click @ui.editButton': 'onEdit',
                'click @ui.saveButton': 'onSave',
                'click @ui.cancelButton': 'onCancel',
                'click @ui.deleteButton': 'onDelete'
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
            },
            showEditingControls: function () {
                this.ui.editButton.hide();
                this.ui.saveButton.show();
                this.ui.cancelButton.show();
                this.ui.deleteButton.hide();
            },
            hideEditingControls: function () {
                this.ui.editButton.show();
                this.ui.saveButton.hide();
                this.ui.cancelButton.hide();
                this.ui.deleteButton.show();
            },
            showWaitingState: function () {
                this.$el.css('opacity', 0.5);
            },
            disableWaitingState: function () {
                this.$el.css('opacity', 1);
            },
            // Deleting from model without a popup
            onDelete: function () {
                this.showWaitingState();
                this.trigger('submit:delete', this.model);
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
