define([
    'app',
    'tpl!views/templates/popup/main.tpl',
    'views/popup/header'
], function (App, Tpl, Header) {
    App.module('Popup', function (Popup, App, Backbone, Marionette, $, _) {
        Popup.Layout = Marionette.LayoutView.extend({
            tagName: 'div',
            id: 'popup-layout-view',
            className: 'modal panel panel-default',
            template: Tpl,
            regions: {
                header:  '.modal-header',
                content: '.modal-body'
            },
            ui: {
                wrapper: '#popup-wrapper',
                header:  '.modal-header',
                content: '.modal-body',
                close: '.close'
            },
            events: {
                'click @ui.close': 'close'
            },
            close: function (event) {
                if (this.options.class) {
                    this.$el.removeClass(this.options.class);
                }
                this.$el.modal('hide');
                this.destroy();
            },
            onShow: function() {
                var header_data = {};
                if (this.options.header) {
                    header_data = this.options.header;
                }

                this.getRegion('header').show(new Header(header_data));

                if (this.options.contentView) {
                    this.getRegion('content').show(this.options.contentView);
                }
                if (this.options.class) {
                    this.$el.addClass(this.options.class);
                }

                this.$el.modal(this.options.modal ? this.options.modal : 'show');
            }
        });
    });
    return App.Popup.Layout;
});