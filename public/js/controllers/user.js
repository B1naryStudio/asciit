define(['app', 'views/user/login'], function (App, View) {
    App.module('User', function (User, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            login: function () {
                require(['models/user'], function () {
                    var view = new View.UserLoginForm();

                    App.Main.Layout.getRegion('content').show(view);
                    User.Controller.listenTo(view, 'form:submit', function (data) {
                        $.when(App.request('user:login', data.email, data.password)).done(function(a,b,c) {
                            App.trigger('questions:list');
                        }).fail(function (errors) {
                            view.triggerMethod('data:invalid', errors);
                        });
                    });
                });
            }
        });
        User.Controller = new Controller();
    });
    return App.User.Controller;
});
