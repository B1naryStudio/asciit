define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/quote-control.tpl',
    'views/view-behaviors/quote-button'
], function (
    App,
    Marionette,
    Backbone,
    Tpl,
    QuoteButton
) {
    App.Main.Views.Quote = Marionette.ItemView.extend({
        tagName: 'div',
        id: 'quote-add-wrapper',
        template: Tpl,
        ui: {
            addButton: '.quote-add'
        },
        triggers: {
            'click @ui.addButton': 'quote:set'
        },
        behaviors: {
            QuoteButton: {
                behaviorClass: QuoteButton
            }
        }
    });

    return App.Main.Views.Quote;
});