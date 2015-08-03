define(['app'], function (App) {
    App.module('Routes', function (Routes, App, Backbone, Marionette, $, _) {
        // routes
        Routes.Router = Marionette.AppRouter.extend({
            appRoutes: {
                '': 'questions',
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
                require(['controllers/question'], function (controller) {
                    controller.questions();
                });
            }
        };

        // events
        this.listenTo(App, 'question:collection', function () {
            Backbone.history.navigate('/');
            API.questions();
        });

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
