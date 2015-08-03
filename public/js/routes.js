define(['app'], function (App) {
    App.module('Routes', function (Routes, App, Backbone, Marionette, $, _) {
        // routes
        Routes.Router = Marionette.AppRouter.extend({
            appRoutes: {
                '': 'questions',
                'questions/:id': 'question',
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
            },
            question: function (id) {
                require(['controllers/question'], function (controller) {
                    controller.question(id);
                });
            }
        };

        // events
        this.listenTo(App, 'question:collection', function () {
            Backbone.history.navigate('/', {trigger: true});
            API.questions();
        });

        this.listenTo(App, 'user:login', function () {
            Backbone.history.navigate('login/', {trigger: true});
            API.login();
        });

        this.listenTo(App, 'question:model', function (id) {
            Backbone.history.navigate('questions/' + id, {trigger: true});
            API.question(id);
        })

        App.addInitializer(function(){
            new Routes.Router({
                controller: API
            });
        });
    });
    return App.Routes.Router;
});
