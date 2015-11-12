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
            var regionName = data.type ? data.type : 'popup';
            App.Main.Views.Layout.getRegion(regionName).show(view);
        },
        close: function (data) {
            var regionName

            if (data && data.type) {
                regionName = data.type;
            } else {
                regionName = 'popup';
            }

            App.Main.Views.Layout.getRegion(regionName).currentView.close(data);
        }
    });
    App.Popup.Controller = new Controller();

    return App.Popup.Controller;
});
