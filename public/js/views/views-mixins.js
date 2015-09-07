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

        ViewsMixins.AdvancedEditable = {
            onEditStart: function () {
                EditorSettings.startupFocus = true;
                this.editors = [];
                var fields = this.options.fields;

                for (var name in fields) {
                    var field = this.$(fields[name]);
                    field.attr('contenteditable', true);
                    this.editors[name] = field.ckeditor(EditorSettings).editor;
                }
            },

            onEditSave: function () {
                Backbone.Validation.bind(this.view);
                var fields = this.options.fields;

                for (var name in fields) {
                    this.view.model.set(name, this.editors[name].getData());
                }

                this.view.trigger('submit:update', this.view.model);
            },

            onEditCancel: function () {
                var previous = this.view.model.previousAttributes();
                this.view.model.set(previous);
                var fields = this.options.fields;

                for (var name in fields) {
                    var field = this.$(fields[name]);
                    field.attr('contenteditable', false);
                    if (name in this.editors) this.editors[name].destroy();

                    field.html(previous[name]);
                }
            },

            onModelUpdated: function () {
                var fields = this.options.fields;

                for (var name in fields) {
                    var field = this.$(fields[name]);
                    field.attr('contenteditable', false);
                    if (name in this.editors) this.editors[name].destroy();
                }
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
