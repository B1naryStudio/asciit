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

        users: function (searchQuery, page) {
            require(['controllers/user/edit-users'], function (controller) {
                controller.execute(searchQuery, page);
            });
        }
    });

    App.User.Controllers.Main = new Controller();

    return App.User.Controllers.Main;
});
