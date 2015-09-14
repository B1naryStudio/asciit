define([
    'app',
    'tpl!views/templates/question/form.tpl',
    'ckeditor.custom.settings',
    'models/question',
    'views/view-behaviors/server-validation',
    'select2',
    'syphon',
    'ckeditor',
    'ckeditor.adapter'
], function (App, FormTpl, EditorSettings, Question, ServerValidation) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        // Abstract view for the question form popups.
        // Don't instantiate - only extend it.
        View.EditForm = Marionette.LayoutView.extend(
            {
                tagName: 'div',
                id: 'question-form-layout',
                template:FormTpl,
                regions: {
                    folder_select: '.folder-select-wrapper',
                    tag_select: '.tag-select-wrapper'
                },

                events: {
                    'submit form': 'submit'
                },

                behaviors: {
                    ServerValidation: {
                        behaviorClass: ServerValidation
                    }
                },

                submit: function (event) {
                    event.preventDefault();
                    var data = Backbone.Syphon.serialize(this);
                    this.model.set(data);

                    // To event in controller
                    this.trigger('form:submit', this.model);
                },

                onShow: function () {
                    this.getRegion('folder_select').show(this.options.folder_view);
                    this.getRegion('tag_select').show(this.options.tag_view);

                    EditorSettings.height = '400px';
                    EditorSettings.uiColor = '#f5f5f5';
                    try {
                        this.editableField = this.$('[name=description]');
                        this.editableField.attr('contenteditable', true);

                        this.editor = this.editableField.ckeditor(EditorSettings)
                            .editor;
                    } catch (e) {
                        console.log('This environment officially is non-supported'
                        + ' with CKEditor');
                    }
                },

                remove: function () {
                    Backbone.Validation.unbind(this);
                    return Backbone.View.prototype.remove.apply(this, arguments);
                },

                initialize: function (options) {
                    if (!options.model) {
                        this.model = new Question.Model({
                            title: "",       // to display an empty model in tpl
                            description: ""  // cause there is 1 tpl for add and upd
                        });
                    }

                    Backbone.Validation.bind(this);
                }
            }
        );
    });
    return App.Question.Views.EditForm;
});

