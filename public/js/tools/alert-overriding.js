define([
    'app',
    'marionette',
    'backbone',
    '../views/popup/alert',
], function (App, Marionette, Backbone, AlertView) {
    window.alert = function(message, title) {
        var title = title || i18n.t("ui.alert-title");

        var alertView = new AlertView({
            message: message
        });

        App.trigger('popup:show', {
            header: {
                title: title
            },
            class: 'alert-form',
            contentView: alertView
        });

        App.listenTo(
            alertView,
            'form:submit',
            function () {
                App.trigger('popup:close');
            }
        );
    };
});
