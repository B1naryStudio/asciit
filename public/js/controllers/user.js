define([
    'app',
    'marionette',
    'backbone',
    'views/user/login',
    'models/user'
], function (
    App,
    Marionette,
    Backbone,
    View,
    User
) {
    var Controller = Marionette.Controller.extend({
        login: function () {
            var view = new View();
            App.Main.Views.Layout.getRegion('content').$el.html('');
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
            App.User.Controller.listenTo(view, 'form:submit', function (data) {
                $.when(App.request('user:login', data.email, data.password))
                    .done(function (model) {
                        App.User.Current = model;
                        model.setAdminFlag();
                        App.trigger('popup:close');
                        App.trigger('init:openRoutes', App.prefix + '/');
                }).fail(function (errors) {
                    view.triggerMethod('data:invalid', errors);
                });
            });
        },
        logout: function () {
            if (App.User && App.User.Current) {
                App.User.Current.destroy({
                    wait: true,
                    success: function (model, response) {
                        delete App.User.Current;
                        document.location = App.prefix + '/';
                    },
                    error: function (model, xhr) {
                        console.log(JSON.parse(xhr.responseText));
                    }
                });
            } else {
                location.reload();
            }
        },
        session: function () {
            var user = new User.Model();
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
    App.User.Controller = new Controller();

    return App.User.Controller;
});
