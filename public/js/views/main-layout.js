define(['app', 'tpl!views/templates/main-layout.tpl', 'views/menu', 'syphon'], function (App, Tpl, Menu) {
    App.module('Main', function (Main, App, Backbone, Marionette, $, _) {
        var Layout = Marionette.LayoutView.extend({
            tagName: 'div',
            id: 'AppLayoutView',
            template: Tpl,
            regions: {
                header: 'header',
                content: '#page-content-wrapper',
                footer: 'footer'
            },
            onShow: function() {
                this.getRegion('header').show(Menu);
            }
        });
        Main.Layout = new Layout();
    });
    return App.Main.Layout;
});