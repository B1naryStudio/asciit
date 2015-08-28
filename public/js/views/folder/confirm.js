define([
    'app',
    'tpl!views/templates/folder/confirm.tpl'
], function (App, ConfirmTpl) {
    App.module('Folder.Views', function (View, App, Backbone, Marionette, $, _) {
        View.ConfirmFolderDeleteView = Marionette.ItemView.extend({
            tagName: 'div',
            id: 'folder-confirm',
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
            }
        });
    });
    return App.Folder.Views.ConfirmFolderDeleteView;
});

