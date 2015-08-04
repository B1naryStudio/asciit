define(['app', 'tpl!views/templates/question/add.tpl', 'select2', 'syphon'], function (App, AddTpl) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.AddForm = Marionette.LayoutView.extend({
            tagName: 'div',
            id: 'question-add-layout',
            template: AddTpl,
            regions: {
                select: '.folder-select-wrapper'
            },
            onShow: function () {
                this.getRegion('select').show(this.options.folder_view);
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

