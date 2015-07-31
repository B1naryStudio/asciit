define(['app', 'tpl!views/templates/main-layout.tpl', 'syphon'], function (App, Tpl) {
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
            initialize: function() {
                console.log('main layout: initialize');
            },
            onRender: function() {
                console.log('main layout: onRender');
            },
            onShow: function() {
                /*var menu = require('views/menu');
                this.menuRegion.show(menu);*/
            }
        });
        Main.Layout = new Layout();
    });
    return App.Main.Layout;
});