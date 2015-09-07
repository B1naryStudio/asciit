define([
    'app',
    'tpl!views/templates/answer/answers.tpl',
    'tpl!views/templates/answer/single-answer.tpl',
    'models/answer',
    'ckeditor.custom.settings',
    'models/comment',
    'views/comment/collection',
    'views/views-mixins',
    'views/view-behaviors/hiding-controls',
    'views/view-behaviors/delete-button',
    'views/view-behaviors/edit-button',
    'views/view-behaviors/contains-votes',
    'views/view-behaviors/code-highlighter',
    'ckeditor',
    'ckeditor.adapter',
    'highlight',
    'syphon',
], function (App, AnswersTpl, SingleAnswerTpl, Answer, EditorSettings, Comment,
             CommentsCompositeView, ViewsMixins, HidingControls, DeleteButton,
             EditButton, ContainsVotes, CodeHighlighter) {
    App.module('Answer.Views', function (View, App, Backbone, Marionette, $, _) {
        View.SingleAnswerLayoutView = Marionette.LayoutView.extend(
            {
                template: SingleAnswerTpl,

                regions: {
                    votes:    '.votes',
                    comments: '.answers-comments-region'
                },

                ui: {
                    itemArea:     '.answer-body',
                    deleteButton: '.answer-body .entry-controls .delete',
                    editButton:   '.answer-body .entry-controls .edit',
                    saveButton:   '.answer-body .entry-controls .save',
                    cancelButton: '.answer-body .entry-controls .cancel'
                },

                triggers: {
                    'mouseover @ui.itemArea': 'show:controls',
                    'mouseout @ui.itemArea':  'hide:controls',
                    'click @ui.deleteButton': 'delete',
                    'click @ui.editButton':   'edit:start',
                    'click @ui.saveButton':   'edit:save',
                    'click @ui.cancelButton': 'edit:cancel'
                },

                behaviors: {
                    HidingControls: {
                        behaviorClass:     HidingControls,
                        controlsContainer: '.entry-controls'
                    },
                    DeleteButton: {
                        behaviorClass: DeleteButton
                    },
                    EditButton: {
                        behaviorClass:     EditButton,
                        controlsContainer: '.answer-body .entry-controls',
                        editButton:        '.answer-body .entry-controls .edit',
                        saveButton:        '.answer-body .entry-controls .save',
                        cancelButton:      '.answer-body .entry-controls .cancel'
                    },
                    ContainsVotes: {
                        behaviorClass: ContainsVotes
                    },
                    CodeHighlighter: {
                        behaviorClass: CodeHighlighter
                    }
                },

                onEditStart: function (event) {
                    var field = this.$el.find('.description');
                    field.attr('contenteditable', true);
                    EditorSettings.startupFocus = true;
                    this.editor = field.ckeditor(EditorSettings).editor;
                },

                onEditSave: function () {
                    Backbone.Validation.bind(this);

                    this.model.set({
                        description: this.editor.getData()
                    });

                    this.trigger('submit:update', this.model);
                },

                onEditCancel: function () {
                    this.editor.destroy();
                    var field = this.$el.find('.description');
                    field.attr('contenteditable', false);

                    var previousDescription = this.model.previous('description')
                    this.model.set({description: previousDescription});
                    field.html(previousDescription);
                },

                onModelUpdated: function () {
                    this.editor.destroy();
                    var field = this.$el.find('.description');
                    field.attr('contenteditable', false);
                },

                selectText: function(e) {
                    e.stopPropagation();
                    var editor = App.helper.editor;
                    var text = App.helper.getSelected();
                    if(text && ( text = new String(text).replace(/^\s+|\s+$/g,''))) {
                        text = '<blockquote><span class="author">'+
                            '<time class="relative" data-abs-time="'+this.model.get('created_at')+'">'+
                            this.model.get('created_relative')+'</time>'+
                        ' by '+this.model.attributes.user.first_name+
                        ' '+this.model.attributes.user.last_name+':</span><br/>'+text+' </blockquote>';
                        editor.focus();

                        App.helper.moveFocus(editor, text);
                        $('html, body').scrollTop(
                            $('#new-answer-form').offset().top
                        );
                    }
                },

                onShow: function () {
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

                    this.listenTo(
                        commentsView,
                        'form:submit',
                        function (model) {
                            $.when(App.request('comment:add', model))
                                .done(function (savedModel) {
                                    commentCollection.push(savedModel);
                                    // Add model and form clearing
                                    var newModel = new Comment.Model({
                                        q_and_a_id: savedModel.attributes.q_and_a_id
                                    });

                                    commentsView.triggerMethod(
                                        'model:refresh',
                                        newModel
                                    );
                                }).fail(function (errors) {
                                    console.log(errors);
                                    commentsView.triggerMethod(
                                        'data:invalid',
                                        errors
                                    );
                                }
                            );
                        }
                    );

                    this.listenTo(
                        commentsView,
                        'childview:submit:delete',
                        function (childview) {
                            App.request(
                                'comment:delete',
                                childview.model
                            )
                        }
                    );
                },

                initialize: function (options) {
                    this.$el.attr('id', 'answer-' + this.model.get('id'));
                }
            }
        );

        View.AnswersCompositeView = Marionette.CompositeView.extend(
            _.extend(
                {},
                ViewsMixins.ServerValidation,
                {
                    tagName: 'section',
                    id: 'answers-list',
                    template: AnswersTpl,
                    childView: View.SingleAnswerLayoutView,
                    childViewContainer: '#answers',

                    events: {
                        'submit form': 'onSubmit',
                        'click .show-form': 'showForm'
                    },

                    showForm: function (e) {
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
                        this.trigger('form:submit', this.model);
                    },
                    // Refresh model and form for the futher using without
                    // view rendering
                    onModelRefresh: function (freshModel) {
                        this.model = freshModel;

                        if (this.editor) {
                            // Erase the editor value.
                            this.editor.setData('');
                        }

                        Backbone.Validation.bind(this);
                    },
                    refreshCounter: function () {
                        this.model.set('count', this.collection.length);
                        this.$el.find('.counter.answers').html(this.model.get('count'));
                    },
                    onShow: function () {
                        EditorSettings.height = '350px';

                        try {
                            this.editor = $('#description').
                                ckeditor(EditorSettings).editor;
                            //for focus from parent
                            this.trigger('editor:created', this.editor);
                        } catch (e) {
                            console.log('This environment officially is non-supported'
                            + ' with CKEditor');
                        } finally {
                            if (this.options.answer_id) {
                                var element = this.$el.find(
                                    '#answer-' + this.options.answer_id
                                );
                                if (element.length) {
                                    $('html, body').scrollTop(
                                        element.focus().offset().top
                                    );
                                }
                            } else {
                                $('html, body').scrollTop(0);
                            }
                        }
                        App.helper.editor = this.editor;
                    },
                    initialize: function (options) {
                        this.childViewOptions = {
                            id: this.id
                        };
                        Backbone.Validation.bind(this);
                        this.listenTo(this.collection, 'update', this.refreshCounter);
                    },
                    remove: function () {
                        // Remove the validation binding
                        // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
                        Backbone.Validation.unbind(this);
                        return Backbone.View.prototype.remove.apply(this, arguments);
                    }
                }
            )
        );
    });

    return App.Answer.Views.AnswersCompositeView;
});
