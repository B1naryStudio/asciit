define([
    'app',
    'marionette',
    'jquery.iframe-resizer'
], function (
    App,
    Marionette
) {
    App.Behaviors.IframesHeight = Marionette.Behavior.extend({
        onShow: function() {
            var self = this;

            // Cannot set 'this.el' in 'defaults'
            var searchIn = this.options.searchIn || this.el;
            $(searchIn)
                .find('iframe.full-height')
                .each(function (i, elem) {
                    var $elem = $(elem);
                    $elem.attr('id', 'code-snippet-' + self.view.cid + '-' + i);
                    $elem.iFrameResize();
                }
            );
        }
    });

    return App.Behaviors.IframesHeight;
});