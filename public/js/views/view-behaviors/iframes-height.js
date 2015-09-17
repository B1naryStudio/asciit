define([
    'app',
    'marionette',
    'jquery.iframeheight'
], function (
    App,
    Marionette
) {
    App.Behaviors.IframesHeight = Marionette.Behavior.extend({
        onShow: function() {
            var self = this;

            this.$('iframe.full-height').each(function (i, elem) {
                $elem = $(elem);
                $elem.attr('id', 'code-snippet-' + self.view.cid + '-' + i);
                $elem.iframeHeight({
                    blockCrossDomain: true
                });
            });
        }
    });

    return App.Behaviors.IframesHeight;
});