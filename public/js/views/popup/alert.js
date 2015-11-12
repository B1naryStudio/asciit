define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/popup/alert.tpl'
], function (
    App,
    Marionette,
    Backbone,
    AlertTpl
) {
    App.Folder.Views.AlertView = Marionette.ItemView.extend({
        tagName: 'div',
        id: 'alert',
        template: AlertTpl,

        events: {
            'submit form': 'submit'
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

        onShow: function () {
            $('.modal-backdrop').addClass('alert');
        },

        onDestroy: function () {
            $('.modal-backdrop').removeClass('alert');
        },

        initialize: function (options) {
            this.message = options.message;
        }
    });

    return App.Folder.Views.AlertView;
});

