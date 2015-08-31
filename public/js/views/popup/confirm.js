define([
    'app',
    'tpl!views/templates/popup/confirm.tpl'
], function (App, ConfirmTpl) {
    App.module('Folder.Views', function (View, App, Backbone, Marionette, $, _) {
        View.ConfirmView = Marionette.ItemView.extend({
            tagName: 'div',
            id: 'confirm',
            template: ConfirmTpl,

            events: {
                'submit form': 'submit',
                'click .cancel-confirm' : 'closePopup'
            },

            closePopup: function () {
                App.trigger('popup:close');
            },

            submit: function (event) {
                event.preventDefault();
                this.trigger('form:submit');
            },

            render: function () {
                this.$el.html(this.template({
                    message: this.message,
                    _t: i18n.t
                }));
            },

            initialize: function (options) {
                this.message = options.message;
            }
        });
    });
    return App.Folder.Views.ConfirmView;
});

