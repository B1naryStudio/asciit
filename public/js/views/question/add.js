define([
    'app',
    'tpl!views/templates/question/add.tpl',
    'select2',
    'syphon',
    'ckeditor',
    'ckeditor.adapter',
], function (App, AddTpl) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.AddForm = Marionette.LayoutView.extend({
            tagName: 'div',
            id: 'question-add-layout',
            template: AddTpl,
            regions: {
                folder_select: '.folder-select-wrapper',
                tag_select: '.tag-select-wrapper'
            },
            onShow: function () {
                this.getRegion('folder_select').show(this.options.folder_view);
                this.getRegion('tag_select').show(this.options.tag_view);

                this.editor = this.$el.find('[name=description]').ckeditor({
                    height: '400px'
                }).editor;
            },
            onDataInvalid: function (errors) {
                $('.error').html('');
                if (!errors) {
                    $('.error.all').html('Something went wrong.');
                } else {
                    for (var i in errors) {
                        if (!errors.hasOwnProperty(i)) {
                            continue;
                        }

                        if (errors[i] && Array.isArray(errors[i])) {
                            for (var j in errors[i]) {
                                if (!errors[i].hasOwnProperty(j)) {
                                    continue;
                                }

                                $('.error.' + i).html(errors[i][j]);
                            }
                        } else {
                            $('.error.' + i).html(errors[i]);
                        }
                    }
                }
            },
            events: {
                'submit form': 'submit'
            },
            submit: function (event) {
                event.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', data);
            },
            remove: function() {
                Backbone.Validation.unbind(this);
                return Backbone.View.prototype.remove.apply(this, arguments);
            }
        });
    });
    return App.Question.Views.AddForm;
});

