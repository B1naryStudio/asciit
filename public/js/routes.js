define(['app'], function (App) {
    App.module('Routes', function (Routes, App, Backbone, Marionette, $, _) {
        // routes
        Routes.Router = Marionette.AppRouter.extend({
            appRoutes: {
                '': 'login',
                'login': 'login'
            }
        });

        var API = {
            login: function () {
                require(['controllers/user'], function (controller) {
                    controller.login();
                });
            },
            questions: function () {
                require(['controllers/questions'], function (controller) {
                    controller.login();
                });
            }
        };

        // events
        this.listenTo(App, 'user:login', function () {
            Backbone.history.navigate('/login');
            API.login();
        });

        App.addInitializer(function(){
            new Routes.Router({
                controller: API
            });
        });
    });
    return App.Routes.Router;
});
