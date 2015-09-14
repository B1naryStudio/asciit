define([
    'app',
    'tpl!views/templates/question/add.tpl',
    'ckeditor.custom.settings',
    'models/question',
    'views/view-behaviors/server-validation',
    'marionette',
    'backbone',
    'select2',
    'syphon',
    'ckeditor',
    'ckeditor.adapter'
], function (
    App,
    AddTpl,
    EditorSettings,
    Question,
    ServerValidation,
    Marionette,
    Backbone
) {
    App.Question.Views.AddForm = Marionette.LayoutView.extend({
        tagName: 'div',
        id: 'question-add-layout',
        template: AddTpl,
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

        initialize: function () {
            this.model = new Question.Model();
            Backbone.Validation.bind(this);
        },

        onShow: function () {
            this.getRegion('folder_select').show(this.options.folder_view);
            this.getRegion('tag_select').show(this.options.tag_view);

            EditorSettings.height = '400px';
            EditorSettings.uiColor = '#f5f5f5';
            try {
                this.editor = this.$el.find('[name=description]')
                    .ckeditor(EditorSettings).editor;
            } catch (e) {
                console.log('This environment officially is non-supported'
                + ' with CKEditor');
            }
        },

        remove: function () {
            Backbone.Validation.unbind(this);
            return Backbone.View.prototype.remove.apply(this, arguments);
        }
    });

    return App.Question.Views.AddForm;
});

