define(['app', 'views/user/login', 'models/user'], function (App, View) {
    App.module('User', function (User, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            login: function () {
                var view = new View();
                App.Main.Layout.getRegion('content').$el.html('');
                App.trigger('popup:show', {
                    header: {
                        title: i18n.t('ui.login-title'),
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
                    $.when(App.request('user:login', data.email, data.password))
                        .done(function (model) {
                            App.User.Current = model;
                            App.trigger('popup:close');
                            App.trigger('init:openRoutes', '/');
                            App.Main.Menu.triggerMethod(
                                'user:authorized',
                                App.User.Current
                            );
                    }).fail(function (errors) {
                        view.triggerMethod('data:invalid', errors);
                    });
                });
            },
            logout: function() {
                if (App.User && App.User.Current) {
                    App.User.Current.destroy({
                        wait: true,
                        success: function(model, response) {
                            delete App.User.Current;
                            //Backbone.history.navigate(
                            //    '/login',
                            //    { trigger: true }
                            //);
                            //document.location = "http://team.binary-studio.com/auth/logout";
                            //App.Main.Menu.triggerMethod('user:leave');

                            document.location = '/';
                        },
                        error: function(model, xhr) {
                            console.log(JSON.parse(xhr.responseText));
                        }
                    });
                } else {
                    location.reload();
                }
            },
            session: function () {
                require(['models/user'], function () {
                    var user = new User.Model();

                    $.when(App.request('user:session')).done(function (user) {
                        App.User.Current = user;

                        App.Main.Menu.triggerMethod(
                            'user:authorized',
                            App.User.Current
                        );
                        App.trigger(
                            'init:openRoutes',
                            Backbone.history.fragment
                        );

                    });
                });
            }
        });
        User.Controller = new Controller();
    });
    return App.User.Controller;
});
