define(['app', 'tpl!views/templates/popup/main.tpl'], function (App, Tpl, Header) {
    App.module('Popup', function (Popup, App, Backbone, Marionette, $, _) {
        Popup.Layout = Marionette.LayoutView.extend({
            tagName: 'div',
            id: 'popup-layout-view',
            className: 'modal',
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
                var self = this;
                var header_data = {};
                if (this.options.header) {
                    header_data = this.options.header;
                }
                require(['views/popup/header'], function (View) {
                    self.getRegion('header').show(new View(header_data));
                });
                if (this.options.contentView) {
                    self.getRegion('content').show(this.options.contentView);
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