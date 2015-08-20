define([
    'app',
    'tpl!views/templates/answer/answers.tpl',
    'tpl!views/templates/answer/single-answer.tpl',
    'models/answer',
    'models/vote',
    'views/vote/single',
    'ckeditor.custom.settings',
    'models/comment',
    'views/comment/collection',
    'ckeditor',
    'ckeditor.adapter',
    'highlight'
], function (App, AnswersTpl, SingleAnswerTpl, Answer, Vote, Votes,
             EditorSettings, Comment, CommentsCompositeView) {
    App.module('Answer.Views', function (View, App, Backbone, Marionette, $, _) {
        View.SingleAnswerLayoutView = Marionette.LayoutView.extend({
            template: SingleAnswerTpl,

            regions: {
                votes: '.votes',
                comments: '.answers-comments-region'
            },

            ui: {
                editButton: '.edit-button',
                saveButton: '.save-button'
            },

            events: {
                'click @ui.editButton': 'onEdit',
                'click @ui.saveButton': 'onSave',
                'mouseup .description': 'selectText'
            },

            selectText: function() {
                var editor = App.helper.editor;
                var text = App.helper.getSelected();
                if(text && ( text = new String(text).replace(/^\s+|\s+$/g,''))) {
                    text = '<blockquote><strong>'+this.model.attributes.created_relative+
                        ' by '+this.model.attributes.user.first_name+
                        ' '+this.model.attributes.user.last_name+'</strong><br/>'+text+'</blockquote>';
                    editor.focus();
                    App.helper.moveFocus(editor, text);
                    $('html, body').scrollTop($('#new-answer-form').offset().top);
                }
            },

            onEdit: function (event) {
                var field = this.$el.find('.description');
                field.attr('contenteditable', true);

                EditorSettings.startupFocus = true;
                this.editor = field.ckeditor(EditorSettings).editor;
            },
            onShow: function () {
                // Highligting code-snippets
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });

                var vote = this.model.get('vote');
                var votesView = new Votes({
                    vote: vote,
                    likes: this.model.get('vote_likes'),
                    dislikes: this.model.get('vote_dislikes'),
                    q_and_a_id: this.model.id
                });
                this.getRegion('votes').show(votesView);

                // Comments
                var commentModel = new Comment.Model({
                    q_and_a_id: this.model.get('id')
                });
                var commentCollection = new Comment.Collection(
                    this.model.get('comments'),
                    {q_and_a_id: this.model.get('id')}
                );
                var commentsView = new CommentsCompositeView({
                    model: commentModel,
                    collection: commentCollection,
                    id: this.id
                });
                this.getRegion('comments').show(commentsView);

                this.listenTo(commentsView, 'form:submit', function (model) {
                    $.when(App.request('comment:add', model))
                        .done(function (savedModel) {
                            commentCollection.push(savedModel);
                            // Add model and form clearing
                            var newModel = new Comment.Model({
                                q_and_a_id: savedModel.attributes.q_and_a_id
                            });

                            commentsView.triggerMethod('model:refresh', newModel);
                        }).fail(function (errors) {
                            console.log(errors);
                            commentsView.triggerMethod('data:invalid', errors);
                        });
                });
            },
            initialize: function (options) {
                this.$el.attr('id', 'answer-' + this.model.get('id'));
            }
        });

        View.AnswersCompositeView = Marionette.CompositeView.extend({
            tagName: 'section',
            id: 'answers-list',
            template: AnswersTpl,
            childView: View.SingleAnswerLayoutView,
            childViewContainer: '#answers',

            events: {
                'submit form': 'onSubmit',
                'click .show-form' : 'showForm',
            },

            showForm: function(e) {
                e.stopPropagation();
                var el = $(e.target)
                    .parents('.row')
                    .siblings('.answers-comments-region')
                    .find('section .comment-form');
                el.toggle();
                $(e.target).toggleClass('form-open');
                el.find('textarea').focus();
            },

            onSubmit: function (event) {
                event.preventDefault();
                var data = Backbone.Syphon.serialize($('#new-answer-form')[0]);
                this.model.set(data);

                if (this.model.isValid(true)) {
                    // To event in controller
                    this.trigger('form:submit', this.model);
                }
            },
            onModelInvalid: function (errors) {
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
            onModelRefresh: function (freshModel) {
                this.model = freshModel;

                if (this.editor) {
                    // Erase the editor value.
                    this.editor.setData('');
                }
            },
            refreshCounter: function () {
                this.model.set('count', this.collection.length)
                this.$el.find('.counter.answers').html(this.model.get('count'));
            },
            onShow: function () {
                EditorSettings.height = '350px';

                try {
                    this.editor = $('#description').ckeditor(EditorSettings).editor;
                    //for focus from parent
                    this.trigger('editor:created', this.editor);
                } catch (e) {
                    console.log('This environment officially is non-supported'
                              + ' with CKEditor');
                } finally {
                    if (this.options.answer_id) {
                        $('html, body').scrollTop(this.$el.find(
                                '#answer-' + this.options.answer_id
                            ).focus().offset().top
                        );
                    } else {
                        $('html, body').scrollTop(0);
                    }
                }
                App.helper.editor = this.editor;
            },
            initialize: function (options) {
                this.childViewOptions = {
                    id: this.id,
                };
                Backbone.Validation.bind(this);
                this.listenTo(this.collection, 'update', this.refreshCounter);
            },
            remove: function() {
                // Remove the validation binding
                // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
                Backbone.Validation.unbind(this);
                return Backbone.View.prototype.remove.apply(this, arguments);
            }
        });
    });

    return App.Answer.Views.AnswersCompositeView;
});
