define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/popup/main.tpl',
    'views/popup/header'
], function (
    App,
    Marionette,
    Backbone,
    Tpl,
    Header
) {
    App.Popup.Layout = Marionette.LayoutView.extend({
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
        onShow: function () {
            var header_data = {};

            if (this.options.header) {
                header_data = this.options.header;
            }

            this.getRegion('header').show(new Header(header_data));

            if (this.options.class) {
                this.$el.addClass(this.options.class);
            }

            // Showing modal
            this.$el.modal(
                this.options.modal ? this.options.modal : 'show'
            );

            // The content view should be showed after a modal, for possibility
            // of adding class for '.modal-backdrop' in onShow() method
            if (this.options.contentView) {
                this.getRegion('content').show(this.options.contentView);
            }

            // The whole modal window becomes visible after it's completely
            // created
            this.$el.css('visibility', 'visible');
        }
    });

    return App.Popup.Layout;
});