define([
    'app',
    'marionette',
    'backbone',
    'models/user',
], function (
    App,
    Marionette,
    Backbone,
    User
) {
    var Controller = Marionette.Controller.extend({
        execute: function () {
            var user = new User.CurrentUserModel();
            App.triggerMethod('spinner:login');

            $.when(App.request('user:session')).done(function (user) {
                App.User.Current = user;
                user.setAdminFlag();

                App.triggerMethod(
                    'user:authorized',
                    App.User.Current
                );

                App.trigger('init:openRoutes', Backbone.history.fragment);
            });
        }
    });
    App.User.Controllers.Session = new Controller();

    return App.User.Controllers.Session;
});
