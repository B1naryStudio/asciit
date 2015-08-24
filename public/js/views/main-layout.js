define([
    'app',
    'tpl!views/templates/main-layout.tpl',
    'views/menu',
    'moment',
    'syphon'
], function (App, Tpl, Menu, moment) {
    App.module('Main', function (Main, App, Backbone, Marionette, $, _) {
        var Layout = Marionette.LayoutView.extend({
            tagName: 'div',
            id: 'app-layout-view',
            template: Tpl,
            regions: {
                header:  'header',
                content: '#page-content-wrapper',
                popup:   '#popup',
                footer:  'footer'
            },
            startRelativeTimeUpdating: function () {
                setInterval(function () {
                    $('time.relative[data-local-time]').html(
                        function () {
                           return moment($(this).data('local-time')).fromNow();
                        }
                    );
                }, 15000);
            },
            onShow: function() {
                this.getRegion('header').show(Menu);

                this.startRelativeTimeUpdating();
                require(['vendor/button_down/button_down'], function () {
                });
            }
        });
        Main.Layout = new Layout();
    });
    return App.Main.Layout;
});