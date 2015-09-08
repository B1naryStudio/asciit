define([
    'app',
    'tpl!views/templates/comment/comments.tpl',
    'tpl!views/templates/comment/single-comment.tpl',
    'views/views-mixins',
    'views/view-behaviors/hiding-controls',
    'views/view-behaviors/delete-button',
    'views/view-behaviors/server-validation',
    'stickit'
], function (App, CommentsTpl, SingleCommentTpl, ViewsMixins, HidingControls,
             DeleteButton, ServerValidation) {
    App.module('Comment.Views', function (View, App, Backbone, Marionette, $, _) {
        View.SingleCommentCompositeView = Marionette.CompositeView.extend(
            _.extend({}, ViewsMixins.SelectText, {
                template: SingleCommentTpl,
                ui: {
                    itemArea:      '.single-comment',
                    deleteButton:  '.entry-controls .delete'
                },

                events: {
                    'mouseup p': 'selectText'
                },

                triggers: {
                    'mouseover @ui.itemArea': 'show:controls',
                    'mouseout @ui.itemArea': 'hide:controls',
                    'click @ui.deleteButton': 'delete'
                },

                behaviors: {
                    HidingControls: {
                        behaviorClass: HidingControls,
                        controlsContainer: '.single-comment .entry-controls'
                    },
                    DeleteButton: {
                        behaviorClass: DeleteButton
                    },
                    ServerValidation: {
                        behaviorClass: ServerValidation
                    }
                }
            })
        );

        View.CommentsCompositeView = Marionette.CompositeView.extend({
            tagName: 'section',
            className: 'comment-list',
            template: CommentsTpl,
            childView: View.SingleCommentCompositeView,
            childViewContainer: '.comments-region',

            events: {
                'submit .comments-form': 'submit',
                'mouseup p': 'selectText'
            },

            submit: function(event) {
                event.preventDefault();
                event.stopPropagation();
                // To event in controller
                this.trigger('form:submit', this.model);
            },

            bindings: {
                '[name=text]': {
                    observe: 'text',
                    setOptions: {
                        validate: true
                    }
                }
            },

            behaviors: {
                ServerValidation: {
                    behaviorClass: ServerValidation
                }
            },

            // Refresh model and form for the futher using without
            // view rendering
            onModelRefresh: function (newModel) {
                this.unstickit();
                this.model = newModel;
                this.stickit();
                Backbone.Validation.bind(this);
                this.hideCommentForm(this.$el);
            },

            hideCommentForm: function (el) {
                var button = el.parent()
                    .siblings('.row')
                    .find('.add-comment');
                if(button.length==0) {
                    button = el.parent()
                        .siblings('.row')
                        .find('.show-form');
                }
                button.trigger("click");
            },

            onRender: function() {
                this.stickit();
                return this;
            },

            initialize: function () {
                Backbone.Validation.bind(this);
            }
        });
    });

    return App.Comment.Views.CommentsCompositeView;
});
