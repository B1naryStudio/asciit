define([
    'app',
    'marionette',
    'backbone',
], function (App, Marionette, Backbone) {
    var Controller = Marionette.Controller.extend({
        login: function () {
            require(['controllers/user/login'], function (controller) {
                controller.execute();
            });
        },

        logout: function () {
            require(['controllers/user/logout'], function (controller) {
                controller.execute();
            });
        },

        session: function () {
            require(['controllers/user/session'], function (controller) {
                controller.execute();
            });
        },

        editUsers: function () {
            require(['controllers/user/edit-users'], function (controller) {
                controller.execute();
            });
        }
    });

    App.User.Controllers.Main = new Controller();

    return App.User.Controllers.Main;
});
