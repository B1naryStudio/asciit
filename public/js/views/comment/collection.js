define(['app',
    'tpl!views/templates/comment/comments.tpl',
    'tpl!views/templates/comment/single-comment.tpl',
    'stickit'
], function (App, CommentsTpl, SingleCommentTpl) {
    App.module('Comment.Views', function (View, App, Backbone, Marionette, $, _) {
        View.SingleCommentCompositeView = Marionette.CompositeView.extend({
            template: SingleCommentTpl,

            events: {
                'mouseup p': 'selectText'
            },

            selectText: function(e) {
                e.stopPropagation();
                var editor = App.helper.editor;
                var text = App.helper.getSelected();
                if (
                    text &&
                    ( text = new String(text).replace(/^\s+|\s+$/g,''))
                ) {
                    text = '<blockquote><strong>' +
                        this.model.get('created_relative') +
                        ' by ' + this.model.get('user').first_name +
                        ' ' + this.model.get('user').last_name +
                        '</strong><br/>' + text + '</blockquote>';
                    editor.focus();
                    App.helper.moveFocus(editor, text);
                    $('html, body').scrollTop($('#new-answer-form').offset().top);
                }
            }
        });

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
                    if (!errors.hasOwnProperty(field)) {
                        continue;
                    }
                    Backbone.Validation.callbacks.invalid(
                        this,
                        field,
                        errors[field]
                    );
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
            }
        });
    });

    return App.Comment.Views.CommentsCompositeView;
});
