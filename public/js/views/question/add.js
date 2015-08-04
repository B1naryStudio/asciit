define(['app', 'views/form', 'tpl!views/templates/question/add.tpl', 'select2', 'syphon'], function (App, FormView, AddTpl) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.AddForm = FormView.extend({
            tagName: 'div',
            template: AddTpl,
            onRender: function () {
                this.$el.find('.folder-select').select2({
                    placeholder: 'Select a folder',
                    tags: true
                });
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

                        $('.error.' + i).html(errors[i]);
                    }
                }
            }
        });
    });
    return App.Question.Views.AddForm;
});

