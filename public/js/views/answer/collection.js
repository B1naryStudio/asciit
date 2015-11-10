define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/answer/answers.tpl',
    'tpl!views/templates/answer/single-answer.tpl',
    'models/answer',
    'ckeditor.custom.settings',
    'models/comment',
    'views/comment/collection',
    'views/view-behaviors/hiding-controls',
    'views/view-behaviors/delete-button',
    'views/view-behaviors/edit-button',
    'views/view-behaviors/contains-votes',
    'views/view-behaviors/code-highlighter',
    'views/view-behaviors/server-validation',
    'views/view-behaviors/fold-collection-items',
    'views/view-behaviors/iframes-height',
    'views/view-behaviors/text-select',
    'views/view-behaviors/best-answer',
    'ckeditor',
    'ckeditor.adapter',
    'highlight',
    'syphon'
], function (
    App,
    Marionette,
    Backbone,
    AnswersTpl,
    SingleAnswerTpl,
    Answer,
    EditorSettings,
    Comment,
    CommentsCompositeView,
    HidingControls,
    DeleteButton,
    EditButton,
    ContainsVotes,
    CodeHighlighter,
    ServerValidation,
    FoldCollectionItems,
    IframesHeight,
    BestAnswer,
    TextSelect
) {
    App.Answer.Views.SingleAnswerLayoutView = Marionette.LayoutView.extend({
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
            cancelButton: '.answer-body .entry-controls .cancel',

            bestControls:           '.best-controls',
            indicatorOfBest:        '.answer-body .best-controls .indicator',
            cancelBestStatusButton: '.answer-body .best-controls .cancel',
            selectAsBestButton:     '.answer-body .best-controls .select'
        },

        triggers: {
            'mouseenter @ui.itemArea': 'over:entry',
            'mouseleave @ui.itemArea':  'out:entry',

            // entry-controls
            'click @ui.deleteButton': 'delete',
            'click @ui.editButton':   'edit:start',
            'click @ui.saveButton':   'edit:save',
            'click @ui.cancelButton': 'edit:cancel',

            // closed controls
            'mouseover @ui.indicatorOfBest':       'best:cancel:button:show',
            'mouseout @ui.cancelBestStatusButton': 'status:best:show',
            'click @ui.selectAsBestButton':        'best:select',
            'click @ui.cancelBestStatusButton':    'best:cancel',

            'mouseup div.model-field, p.model-field': 'text:select'
        },

        behaviors: {
            HidingControls: {
                behaviorClass: HidingControls,
                controlsContainer: ".answer-body .entry-controls"
            },
            DeleteButton: {
                behaviorClass: DeleteButton,
                itemArea: '.answer-body'
            },
            EditButton: {
                behaviorClass: EditButton,
                controlsContainer: ".answer-body .entry-controls"
            },
            ContainsVotes: {
                behaviorClass: ContainsVotes
            },
            CodeHighlighter: {
                behaviorClass: CodeHighlighter
            },
            ServerValidation: {
                behaviorClass: ServerValidation
            },
            IframesHeight : {
                behaviorClass: IframesHeight
            },
            BestAnswer : {
                behaviorClass: BestAnswer
            },
            TextSelect: {
                behaviorClass: TextSelect
            }
        },

        onEditStart: function () {
            Backbone.Validation.bind(this);

            this.editableField = this.$el.find('.description');
            this.editableField.attr('contenteditable', true);

            EditorSettings.startupFocus = true;
            this.editor = this.editableField
                              .ckeditor(EditorSettings)
                              .editor;
        },

        onEditSave: function () {
            this.model.set({
                description: this.editor.getData()
            });

            this.trigger('submit:update', this.model);
        },

        onEditCancel: function () {
            this.editor.destroy();
            this.editableField.attr('contenteditable', false);

            var previousDescription = this.model.previous('description');
            this.model.set({description: previousDescription});
            this.editableField.html(previousDescription);

            this.triggerMethod('iframe:resize');
        },

        onModelUpdated: function () {
            this.editor.destroy();
            this.editableField.attr('contenteditable', false);
            this.triggerMethod('iframe:resize');
            this.triggerMethod('show');
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
                'childview:submit:update',
                function (childview) {
                    $.when(App.request(
                        'comment:update',
                        childview.model
                    )).done(function (savedModel) {
                        childview.triggerMethod(
                            'model:updated',
                            savedModel
                        );
                    }).fail(function (errors) {
                        childview.triggerMethod(
                            'model:invalid',
                            errors
                        );
                    });
                }
            );

            this.listenTo(
                commentsView,
                'childview:submit:delete',
                function (childview) {
                    $.when(App.request(
                        'comment:delete',
                        childview.model
                    )).fail(function (errors) {
                        childview.triggerMethod(
                            'delete:error',
                            errors
                        );
                    });
                }
            );
        },

        initialize: function (options) {
            this.$el.attr('id', 'answer-' + this.model.get('id'));
        }
    });

    App.Answer.Views.AnswersCompositeView = Marionette.CompositeView.extend({
        tagName: 'section',
        id: 'answers-list',
        template: AnswersTpl,
        childView: App.Answer.Views.SingleAnswerLayoutView,
        childViewContainer: '#answers',

        ui: {
            foldButton: '.folding-controls .fold',
            unfoldButton: '.folding-controls .unfold',
            errorBlock: '.answers-error-block'
        },

        triggers: {
            'click @ui.foldButton': 'list:fold',
            'click @ui.unfoldButton': 'list:unfold'
        },

        events: {
            'submit form': 'onSubmit',
            'click .show-form': 'showNewCommentForm'
        },

        behaviors: {
            ServerValidation: {
                behaviorClass: ServerValidation
            },
            FoldCollectionItems: {
                behaviorClass: FoldCollectionItems,
                maxEntries: 2
            }
        },

        showNewCommentForm: function (e) {
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
    });

    return App.Answer.Views.AnswersCompositeView;
});
