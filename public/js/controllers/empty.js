define(['app', 'views/empty'], function (App, EmptyView) {
    App.module('Empty', function (Empty, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            empty: function () {
                var view = new EmptyView();
                App.Main.Layout
                    .getRegion('content')
                    .show(view);
            }
        });

        Empty.Controller = new Controller();
    });
    return App.Empty.Controller;
});
