define([
    'app',
    'models/vote',
    'tpl!views/templates/vote/votes.tpl'
], function (App, Vote, VotesTpl) {
    App.module('Vote.Views', function (Views, App, Backbone, Marionette, $, _) {
        Views.Votes = Marionette.ItemView.extend({
            template: VotesTpl,
            ui: {
                likeButton:    '.like',
                dislikeButton: '.dislike',
                cancelButton:  '.cancel',
                ratingCounter: '.counter'
            },
            events: {
                'click @ui.likeButton':    'onLike',
                'click @ui.dislikeButton': 'onDislike',
                'click @ui.cancelButton':  'onCancel',
                'mouseover @ui.ratingCounter': 'showSeparateRating',
                'mouseout @ui.ratingCounter': 'showUnitedRating'
            },

            onLike: function () {
                this.model.set('sign', 1);
                this.submit(this.model);
            },
            onDislike: function () {
                this.model.set('sign', 0);
                this.submit(this.model);
            },
            submit: function () {
                var self = this;

                $.when(App.request('vote:add', this.model))
                    .done(function (savedModel) {
                        if (savedModel.get('sign')) {
                            self.options.likes++;
                        } else {
                            self.options.dislikes++;
                        }
                        self.render();
                    }).fail(function (errors) {
                        self.onDataInvalid(errors);
                    });
            },
            onCancel: function () {
                var self = this;
                $.when(App.request('vote:cancel', this.model))
                    .done(function (deletedModel) {
                        delete self.options.data;
                        if (deletedModel.get('sign')) {
                            self.options.likes--;
                        } else {
                            self.options.dislikes--;
                        }
                        self.updateModel();
                        self.render();
                    }).fail(function (errors) {
                        self.onDataInvalid(errors);
                    });
            },
            onDataInvalid: function (errors) {
                console.log(errors);
            },
            showSeparateRating: function () {
                var counter = this.$el.find(this.ui.ratingCounter);
                counter.addClass('divided');
                counter.html(
                    this.options.dislikes
                        + '/'
                        + this.options.likes
                );
            },
            showUnitedRating: function () {
                var counter = this.$el.find(this.ui.ratingCounter);
                var self = this;

                setTimeout(function () {
                    counter.removeClass('divided');
                    counter.html(
                        self.options.likes - self.options.dislikes
                    );
                }, 700);
            },
            render: function () {
                // Calculate rating
                var rating = this.options.likes - this.options.dislikes;

                // Moving rating parameter to template
                this.$el.html(this.template({
                    rating: rating
                }));

                this.onShow();
            },
            onShow: function () {
                if (this.model.has('id')) {
                    if (this.model.get('sign') == 0) {
                        this.$el.find(this.ui.likeButton).toggleClass('like cancel');
                        this.$el.find(this.ui.dislikeButton).toggleClass('dislike voted cancel');
                    } else {
                        this.$el.find(this.ui.likeButton).toggleClass('like voted cancel');
                        this.$el.find(this.ui.dislikeButton).toggleClass('dislike cancel');
                    }
                }
            },
            initialize: function (options) {
                this.options.data = options.vote;
                this.options.q_and_a_id = options.q_and_a_id;
                this.options.likes = options.likes;
                this.options.dislikes = options.dislikes;
                this.updateModel();
            },
            updateModel: function () {
                var data = this.options.data ? this.options.data : { q_and_a_id: this.options.q_and_a_id };
                this.model = new Vote.Model(data);
            }
        });
    });

    return Vote.Views.Votes;
});