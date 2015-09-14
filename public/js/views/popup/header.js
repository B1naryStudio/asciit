define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/popup/header.tpl'
], function (
    App,
    Marionette,
    Backbone,
    Tpl
) {
    App.Popup.View = Marionette.ItemView.extend({
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

    return App.Popup.View;
});