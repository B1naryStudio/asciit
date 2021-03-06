    define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/comment/comments.tpl',
    'tpl!views/templates/comment/single-comment.tpl',
    'views/view-behaviors/hiding-controls',
    'views/view-behaviors/delete-button',
    'views/view-behaviors/edit-button',
    'views/view-behaviors/server-validation',
    'views/view-behaviors/fold-collection-items',
    'views/view-behaviors/text-select',
    'stickit',
    'jquery.elastic'
], function (
    App,
    Marionette,
    Backbone,
    CommentsTpl,
    SingleCommentTpl,
    HidingControls,
    DeleteButton,
    EditButton,
    ServerValidation,
    Collapse,
    TextSelect
) {
    App.Comment.Views.SingleCommentCompositeView = Marionette.CompositeView.extend({
        template: SingleCommentTpl,
        className: "list-group-item single-comment",

        ui: {
            deleteButton: '.entry-controls .delete',
            editButton:   '.entry-controls .edit',
            saveButton:   '.entry-controls .save',
            cancelButton: '.entry-controls .cancel'
        },

        events: {
            'model:live:updated': 'onModelLiveUpdated'
        },

        modelEvents: {
            'live:updated': 'onModelLiveUpdated'
        },

        triggers: {
            'mouseenter': 'over:entry',
            'mouseleave':  'out:entry',
            'click @ui.deleteButton': 'delete',
            'click @ui.editButton':   'edit:start',
            'click @ui.saveButton':   'edit:save',
            'click @ui.cancelButton': 'edit:cancel',
            'mouseup p': 'text:select'
        },

        behaviors: {
            HidingControls: {
                behaviorClass: HidingControls,
                controlsContainer: '    .entry-controls'
            },
            DeleteButton: {
                behaviorClass: DeleteButton,
                itemArea: this.el
            },
            EditButton: {
                behaviorClass: EditButton
            },
            ServerValidation: {
                behaviorClass: ServerValidation
            },
            TextSelect: {
                behaviorClass: TextSelect
            }
        },

        bindings: {
            '.single-comment .editing-form [name=text]': {
                observe: 'text',
                setOptions: {
                    validate: true,     //printing-time validation
                    events: ['blur', 'input', 'change']
                }
            }
        },

        onEditStart: function () {
            Backbone.Validation.bind(this);

            // stickit doesn't save the old values in 'previous'
            this.model.oldValues = this.model.toJSON();

            this.textElem = this.$('.model-field.text');
            this.textElem.attr('contenteditable', true)
                         .attr('spellcheck', false);
        },

        onEditSave: function () {
            this.model.set({
                text: this.textElem.text()
            });

            this.model.validate();

            if (this.model.isValid()) {
                this.triggerMethod('submit:update', this.model);
            }
        },

        onEditCancel: function () {
            this.model.set(this.model.oldValues);

            // hiding the error messages
            this.$(' .help-block, .error-block').addClass('hidden');

            this.switchToText();
        },

        onModelUpdated: function () {
            this.switchToText();
        },

        onModelLiveUpdated: function () {
            if (!this.textElem) {
                this.textElem = this.$('.model-field.text');
            }

            var newEscapedText = _.escape(this.model.get('text'));
            this.textElem.html(newEscapedText);
        },

        switchToText: function () {
            var escapedText = _.escape(this.model.get('text'));
            this.textElem.html(escapedText)
                         .attr('contenteditable', false);

            // unbind the bindings
            Backbone.Validation.unbind(this);
        }
    });

    App.Comment.Views.CommentsCompositeView = Marionette.CompositeView.extend({
        tagName: 'section',
        className: 'comment-list',
        template: CommentsTpl,
        childView: App.Comment.Views.SingleCommentCompositeView,
        childViewContainer: '.comments-region',

        ui: {
            foldButton: '.fold',
            unfoldButton: '.unfold'
        },

        triggers: {
            'click @ui.foldButton': 'list:fold',
            'click @ui.unfoldButton': 'list:unfold',
            'mouseup p': 'text:select'
        },

        events: {
            'submit .comments-form': 'submit'
        },

        behaviors: {
            ServerValidation: {
                behaviorClass: ServerValidation
            },
            Collapse: {
                behaviorClass: Collapse,
                maxEntries: 3
            },
            TextSelect: {
                behaviorClass: TextSelect
            }
        },

        bindings: {
            '.comments-form [name=text]': {
                observe: 'text',
                setOptions: {
                    validate: true
                }
            }
        },

        submit: function(event) {
            event.preventDefault();
            event.stopPropagation();
            // To event in controller
            if (!this.model.validationError) {
                this.trigger('form:submit', this.model);
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

            if(button.length === 0) {
                button = el.parent()
                    .siblings('.row')
                    .find('.show-form');
            }

            button.trigger("click");
        },

        onRender: function() {
            this.stickit();
        },

        initialize: function () {
            Backbone.Validation.bind(this);
        }
    });

    return App.Comment.Views.CommentsCompositeView;
});
