define([
    'app',
    'views/popup/layout',
    'marionette'
], function (
    App,
    View,
    Marionette
) {
    var Controller = Marionette.Controller.extend({
        show: function (data) {
            var view = new View(data);
            App.Main.Views.Layout.getRegion('popup').show(view);
        },
        close: function (data) {
            App.Main.Views.Layout.getRegion('popup').currentView.close(data);
        }
    });
    App.Popup.Controller = new Controller();

    return App.Popup.Controller;
});
