define(['app', 'tpl!views/templates/popup/header.tpl'], function (App, Tpl) {
    App.module('Popup', function (Popup, App, Backbone, Marionette, $, _) {
        Popup.View = Marionette.ItemView.extend({
            template: Tpl,
            onShow: function () {
                if (this.options.title) {
                    this.$el.find('h3').html(this.options.title);
                }
                if (this.options.without_close) {
                    this.$el.find('.close').hide();
                }
            },
            remove: function () {
                Backbone.Validation.unbind(this);
                return Backbone.View.prototype.remove.apply(this, arguments);
            }
        });
    });
    return App.Popup.View;
});