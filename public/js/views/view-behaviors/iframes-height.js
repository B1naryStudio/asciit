define([
    'app',
    'marionette',
    'jquery.iframe-resizer'
], function (
    App,
    Marionette
) {
    App.Behaviors.IframesHeight = Marionette.Behavior.extend({
        onShow: function () {
            this.onIframeResize();
        },

        // separate function for triggering from the view
        onIframeResize: function () {
            var self = this;

            // Cannot set 'this.el' in 'defaults'
            var searchIn = this.options.searchIn || this.el;
            $(searchIn)
                .find('iframe.full-height')
                .each(function (i, elem) {
                    var $elem = $(elem);
                    $elem.attr('id', 'code-snippet-' + self.view.cid + '-' + i);

                    $elem.load(function () {
                        $elem.iFrameResize({
                            maxHeight: 600,
                            scrolling: true,
                            heightCalculationMethod: "documentElementScroll"
                        });
                    })
                }
            );
        }
    });

    return App.Behaviors.IframesHeight;
});