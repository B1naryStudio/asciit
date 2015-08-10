define([
    'app',
    'tpl!views/templates/answer/answers.tpl',
    'tpl!views/templates/answer/single-answer.tpl',
    'models/answer',
    'ckeditor',
    'ckeditor.adapter',
], function (App, AnswersTpl, SingleAnswerTpl, Answer) {
    App.module('Answer.Views', function (View, App, Backbone, Marionette, $, _) {
        View.SingleAnswerCompositeView = Marionette.CompositeView.extend({
            template: SingleAnswerTpl,
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

                this.editor = field.ckeditor({
                    startupFocus: true
                }).editor;
            }
        });

        View.AnswersCompositeView = Marionette.CompositeView.extend({
            tagName: 'section',
            id: 'answers-list',
            template: AnswersTpl,
            childView: View.SingleAnswerCompositeView,
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
                this.editor = $('#description').ckeditor({
                    height: '500px'
                }).editor;
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
