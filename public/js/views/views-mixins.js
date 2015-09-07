define(['app'], function(App) {
    App.module('ViewsMixins', function(ViewsMixins, App, Backbone, Marionette, $, _) {
        ViewsMixins.AdvancedEditable = {
            onEditStart: function () {
                EditorSettings.startupFocus = true;
                this.editors = [];
                var fields = this.options.fields;

                for (var name in fields) {
                    var field = this.$(fields[name]);
                    field.attr('contenteditable', true);
                    this.editors[name] = field.ckeditor(EditorSettings).editor;
                }
            },

            onEditSave: function () {
                Backbone.Validation.bind(this.view);
                var fields = this.options.fields;

                for (var name in fields) {
                    this.view.model.set(name, this.editors[name].getData());
                }

                this.view.trigger('submit:update', this.view.model);
            },

            onEditCancel: function () {
                var previous = this.view.model.previousAttributes();
                this.view.model.set(previous);
                var fields = this.options.fields;

                for (var name in fields) {
                    var field = this.$(fields[name]);
                    field.attr('contenteditable', false);
                    if (name in this.editors) this.editors[name].destroy();

                    field.html(previous[name]);
                }
            },

            onModelUpdated: function () {
                var fields = this.options.fields;

                for (var name in fields) {
                    var field = this.$(fields[name]);
                    field.attr('contenteditable', false);
                    if (name in this.editors) this.editors[name].destroy();
                }
            }
        };

        ViewsMixins.ServerValidation = {
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
            }
        };

        ViewsMixins.SelectText = {
            selectText: function(e) {
                e.stopPropagation();
                var modelFieldContainer = e.target.closest('.model-field');

                if ($(modelFieldContainer).attr('contenteditable') == 'true') return;

                var editor = App.helper.editor;
                var text = App.helper.getSelected();

                if(text && ( text = new String(text).replace(/^\s+|\s+$/g,''))) {
                    text = '<blockquote><span class="author">' +
                           '<time class="relative" data-abs-time="' +
                           this.model.get('created_at') +
                           '">' +
                           this.model.get('created_relative') +
                           '</time>' +
                           ' by ' +
                           this.model.attributes.user.first_name +
                           ' ' +
                           this.model.attributes.user.last_name +
                           ':</span><br/>' +
                           text +
                           ' </blockquote>';

                    editor.focus();
                    App.helper.moveFocus(editor, text);

                    $('html, body').scrollTop(
                        $('#new-answer-form').offset().top
                    );
                }
            }
        }
    });

    return App.ViewsMixins;
});
