define(['app', 'views/form', 'tpl!views/templates/question/add.tpl', 'syphon'], function (App, FormView, AddTpl) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.AddForm = FormView.extend({
            tagName: 'div',
            template: AddTpl,
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

