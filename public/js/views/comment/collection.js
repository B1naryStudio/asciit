define(['app',
    'tpl!views/templates/comment/comments.tpl',
    'tpl!views/templates/comment/single-comment.tpl',
    'views/views-mixins',
    'views/view-behaviors/hiding-controls',
    'views/view-behaviors/delete-button',
    'views/view-behaviors/edit-button',
    'views/view-behaviors/server-validation',
    'marionette',
    'backbone',
    'stickit',
    'jquery.elastic'
], function (
    App,
    CommentsTpl,
    SingleCommentTpl,
    ViewsMixins,
    HidingControls,
    DeleteButton, 
    EditButton, 
    ServerValidation,
    Marionette,
    Backbone
) {
    App.Comment.Views.SingleCommentCompositeView = Marionette.CompositeView.extend(
        _.extend({}, ViewsMixins.SelectText, {
            template: SingleCommentTpl,
            ui: {
                itemArea:     '.single-comment',
                deleteButton: '.entry-controls .delete',
                editButton:   '.entry-controls .edit',
                saveButton:   '.entry-controls .save',
                cancelButton: '.entry-controls .cancel'
            },

            events: {
                'mouseup p': 'selectText',
                'model:live:updated': 'onModelLiveUpdated'
            },

            modelEvents: {
                'live:updated': 'onModelLiveUpdated'
            },

            triggers: {
                'mouseover @ui.itemArea': 'controls:show',
                'mouseout @ui.itemArea':  'controls:hide',
                'click @ui.deleteButton': 'delete',
                'click @ui.editButton':   'edit:start',
                'click @ui.saveButton':   'edit:save',
                'click @ui.cancelButton': 'edit:cancel'
            },

            behaviors: {
                HidingControls: {
                    behaviorClass: HidingControls,
                    controlsContainer: '.single-comment .entry-controls'
                },
                DeleteButton: {
                    behaviorClass: DeleteButton,
                    itemArea: '.single-comment'
                },
                EditButton: {
                    behaviorClass: EditButton
                },
                ServerValidation: {
                    behaviorClass: ServerValidation
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
                this.stickit();

                this.textElem = this.$('.model-field.text');
                this.editableField = this.$('[name=text]');

                this.textElem.hide();
                this.editableField
                    .val(this.model.get('text'))
                    .removeClass('hidden')
                    .elastic({
                        compactOnBlur: false,
                        emptyLinesBelow: 0
                    }).focus();
            },

            onEditSave: function () {
                if (!this.model.validationError) {
                    this.triggerMethod('submit:update', this.model);
                }
            },

            onEditCancel: function () {
                this.model.set(this.model.oldValues);

                // hiding the error messages
                this.$(
                    this.ui.itemArea.selector +
                    ' .help-block, ' +             // validation errors
                    this.ui.itemArea.selector +
                    ' .error-block'                // server errors
                ).addClass('hidden');

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
                // revert the fields visibility
                this.editableField.val('');
                this.editableField.addClass('hidden');

                var escapedText = _.escape(this.model.get('text'));
                this.textElem.html(escapedText);
                this.textElem.show();

                // unbind the bindings
                this.unstickit();
                Backbone.Validation.unbind(this);
            }
        })
    );

    App.Comment.Views.CommentsCompositeView = Marionette.CompositeView.extend({
        tagName: 'section',
        className: 'comment-list',
        template: CommentsTpl,
        childView: App.Comment.Views.SingleCommentCompositeView,
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
            '.comments-form [name=text]': {
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

            if(button.length === 0) {
                button = el.parent()
                    .siblings('.row')
                    .find('.show-form');
            }

            button.trigger('click');
        },

        onRender: function() {
            this.stickit();
            return this;
        },

        initialize: function () {
            Backbone.Validation.bind(this);
        }
    });

    return App.Comment.Views.CommentsCompositeView;
});