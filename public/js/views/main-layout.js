define([
    'app',
    'tpl!views/templates/main-layout.tpl',
    'views/menu',
    'moment',
    'syphon',
    'updown'
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
                    $('time.relative[data-abs-time]').html(
                        function () {
                            var local = moment.utc($(this).data('abs-time'));
                            return moment(local).fromNow();
                        }
                    );
                    $('time.locale[data-abs-time]').html(
                        function () {
                            return moment.utc($(this).data('abs-time')).toDate();
                        }
                    );
                }, 15000);
            },
            onShow: function() {
                this.getRegion('header').show(Menu);

                this.startRelativeTimeUpdating();
            }
        });
        Main.Layout = new Layout();
    });
    return App.Main.Layout;
});