define([
    'app',
    'marionette',
    'backbone',
    'views/popup/layout'
], function (
    App,
    Marionette,
    Backbone,
    View
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
