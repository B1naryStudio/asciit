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
                        self.collection.push(savedModel);
                        self.render();
                    }).fail(function (errors) {
                        self.onDataInvalid(errors);
                    });
            },
            onCancel: function () {
                var self = this;

                $.when(App.request('vote:cancel', this.model))
                    .done(function (deletedModel) {
                        self.collection.remove(deletedModel);
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
                    this.collection.where({sign: 0}).length
                        + '/'
                        + this.collection.where({sign: 1}).length
                );
            },
            showUnitedRating: function () {
                var counter = this.$el.find(this.ui.ratingCounter);
                var self = this;

                setTimeout(function () {
                    counter.removeClass('divided');
                    counter.html(
                        self.collection.where({sign: 1}).length
                        - self.collection.where({sign: 0}).length
                    );
                }, 700);
            },
            render: function () {
                // Calculate rating
                var rating = this.collection.where({sign: 1}).length
                    - this.collection.where({sign: 0}).length;

                // Moving rating parameter to template
                this.$el.html(this.template({
                    rating: rating
                }));

                // Model refreshing
                this.model = this.collection.findWhere({'user_id': App.User.Current.id})
                    || new Vote.Model({'q_and_a_id': this.q_and_a_id});

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
                this.q_and_a_id = options.q_and_a_id;
            }
        });
    });

    return Vote.Views.VotesCompositeView;
});