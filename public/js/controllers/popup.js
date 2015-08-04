define(['app', 'views/popup/layout'], function (App, View) {
    App.module('Popup', function (Popup, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            show: function (data) {
                var view = new View(data);
                App.Main.Layout.getRegion('popup').show(view);
            },
            close: function (data) {
                App.Main.Layout.getRegion('popup').currentView.close(data);
            }
        });
        Popup.Controller = new Controller();
    });
    return App.Popup.Controller;
});
