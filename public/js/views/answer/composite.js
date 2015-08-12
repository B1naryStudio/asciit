define([
    'app',
    'tpl!views/templates/answer/answers.tpl',
    'tpl!views/templates/answer/single-answer.tpl',
    'models/answer',
    'models/vote',
    'views/vote/composite',
    'ckeditor.custom.settings',
    'ckeditor',
    'ckeditor.adapter',
    'highlight'
], function (App, AnswersTpl, SingleAnswerTpl, Answer, Vote, VotesCompositeView, EditorSettings) {
    App.module('Answer.Views', function (View, App, Backbone, Marionette, $, _) {
        View.SingleAnswerLayoutView = Marionette.LayoutView.extend({
            template: SingleAnswerTpl,

            regions: {
                votes: '.votes'
            },

            ui: {
                editButton: '.edit-button',
                saveButton: '.save-button'
            },

            events: {
                'click @ui.editButton': 'onEdit',
                'click @ui.saveButton': 'onSave'
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

                var votes = new Vote.Collection(this.model.get('votes'));
                var votesView = new VotesCompositeView({collection: votes});
                this.getRegion('votes').show(votesView);
            }
        });

        View.AnswersCompositeView = Marionette.CompositeView.extend({
            tagName: 'section',
            id: 'answers-list',
            template: AnswersTpl,
            childView: View.SingleAnswerLayoutView,
            childViewContainer: '#answers',

            events: {
                'submit form': 'onSubmit'
            },

            onSubmit: function (event) {
                event.preventDefault();

                var data = Backbone.Syphon.serialize(this);
                this.model.set(data);

                if (this.model.isValid(true)) {
                    // To event in controller
                    this.trigger('form:submit', this.model);
                }
            },
            onDataInvalid: function (errors) {
                for (var field in errors) {
                    Backbone.Validation.callbacks.invalid(this, field, errors[field]);
                }
            },
            // Refresh model and form for the futher using without view rendering
            onModelRefresh: function (freshModel) {
                this.model = freshModel;
                this.refreshCounter();

                // Erase the editor value.
                this.editor.setData('');
            },
            refreshCounter: function () {
                $(this.el).find('.counter').html(this.model.get('count'));
            },
            onShow: function () {
                EditorSettings.height = '500px';
                this.editor = $('#description').ckeditor(EditorSettings).editor;
           },
            initialize: function () {
                Backbone.Validation.bind(this);
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
