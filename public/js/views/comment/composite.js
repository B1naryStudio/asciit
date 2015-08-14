define(['app',
    'tpl!views/templates/comment/comments.tpl',
    'tpl!views/templates/comment/single-comment.tpl',
    'stickit'
], function (App, CommentsTpl, SingleCommentTpl) {
    App.module('Comment.Views', function (View, App, Backbone, Marionette, $, _) {
        View.SingleCommentCompositeView = Marionette.CompositeView.extend({
            template: SingleCommentTpl
        });

        View.CommentsCompositeView = Marionette.CompositeView.extend({
            tagName: 'section',
            className: 'comment-list',
            template: CommentsTpl,
            childView: View.SingleCommentCompositeView,
            childViewContainer: '.comments-region',


            events: {
                'submit .comments-form': 'submit'
            },

            submit: function(event) {
                console.log(this.model);
                event.preventDefault();
                event.stopPropagation();
                if (this.model.isValid(true)) {
                    // To event in controller
                    this.trigger('form:submit', this.model);
                }

            },
            bindings: {
                '[name=text]': {
                    observe: 'text',
                    setOptions: {
                        validate: true
                    }
                }
            },


            onDataInvalid: function (errors) {
                for (var field in errors) {
                    Backbone.Validation.callbacks.invalid(this, field, errors[field]);
                }
            },
            // Refresh model and form for the futher using without view rendering
            onModelRefresh: function (newModel) {
                this.model = newModel;
                this.stickit();
            },

            onRender: function() {
                this.stickit();
                return this;
            },

            initialize: function () {
                Backbone.Validation.bind(this);
            },

        });
    });

    return App.Comment.Views.CommentsCompositeView;
});
