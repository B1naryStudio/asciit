define([
    'app',
    'marionette',
    'backbone',
    'views/menu/mock',
    'tpl!views/templates/main-layout.tpl',
    'moment',
    'syphon',
    'updown'
], function (
    App,
    Marionette,
    Backbone,
    MenuView,
    Tpl, 
    Moment
) {
    var Layout = Marionette.LayoutView.extend({
        tagName: 'div',
        id: 'app-layout-view',
        template: Tpl,
        regions: {
            header:  'header',
            content: '#page-content-wrapper',
            popup:   '#popup',
            quoteRegion: '#quote',
            footer:  'footer'
        },
        startRelativeTimeUpdating: function () {
            setInterval(function () {
                $('time.relative[data-abs-time]').html(
                    function () {
                        var local = Moment.utc($(this).data('abs-time'));
                        return Moment(local).fromNow();
                    }
                );
                $('time.locale[data-abs-time]').html(
                    function () {
                        return Moment.utc($(this).data('abs-time')).toDate();
                    }
                );
            }, 15000);
        },
        onShow: function() {
            this.startRelativeTimeUpdating();
        },
        onRender: function () {
            this.getRegion('header').show(new MenuView());
        }
    });
    App.Main.Views.Layout = new Layout();

    return App.Main.Views.Layout;
});