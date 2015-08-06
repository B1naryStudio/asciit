define(['app', 'views/user/login'], function (App, View) {
    App.module('User', function (User, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            login: function () {
                require(['models/user'], function () {
                    var view = new View();
                    App.Main.Layout.getRegion('content').show(view);
                    App.trigger('popup:show', {
                        header: {
                            title: 'Please log in',
                            without_close: true
                        },
                        class: 'login',
                        contentView: view,
                        modal: {
                            keyboard: false,
                            backdrop: 'static'
                        }
                    });
                    User.Controller.listenTo(view, 'form:submit', function (data) {
                        $.when(App.request('user:login', data.email, data.password)).done(function (model) {
                            App.User.Current = model;
                            App.trigger('question:collection');
                            App.trigger('popup:close');
                            Backbone.history.navigate('/', { trigger: true })
                        }).fail(function (errors) {
                            view.triggerMethod('data:invalid', errors);
                        });
                    });
                });
            },
            logout: function() {
                if (App.User && App.User.Current) {
                    App.User.Current.destroy({
                        wait: true,
                        success: function(model, response) {
                            delete App.User.Current;
                            Backbone.history.navigate('/login', { trigger: true });
                        }
                    });
                } else {
                    Backbone.history.navigate('/login', { trigger: true });
                }
            }
        });
        User.Controller = new Controller();
    });
    return App.User.Controller;
});
