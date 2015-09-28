define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    App.Behaviors.TextSelect = Marionette.Behavior.extend({
        onTextSelect: function (e) {
            var selection = App.helper.getSelected();

            if (selection) {
                var text = new String(selection).replace(/^\s+|\s+$/g, '');

                if (text) {
                    App.helper.saveSelectedInfo({
                        model: this.view.model,
                        text: text
                    });
                    App.trigger('select:after', window.event);
                }
            }
        }
    });

    return App.Behaviors.TextSelect;
});