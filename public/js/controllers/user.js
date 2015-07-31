define(['app', 'views/user/login'], function (App, View) {
    App.module('User', function (User, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            login: function () {
                require(['models/user'], function () {
                    var view = new View.UserLoginForm();

                    App.Main.Layout.content.show(view);
                    User.Controller.listenTo(view, 'form:submit', function (data) {
                        // TODO: request to login
                    });
                });
            }
        });
        User.Controller = new Controller();
    });
    return App.User.Controller;
});
