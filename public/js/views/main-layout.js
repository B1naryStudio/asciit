define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/main-layout.tpl',
    'moment',
    'syphon',
    'updown'
], function (
    App,
    Marionette,
    Backbone,
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
        }
    });
    App.Main.Views.Layout = new Layout();

    return App.Main.Views.Layout;
});