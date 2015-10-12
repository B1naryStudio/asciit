define([
    'app',
    'marionette',
    'backbone',
    'views/user/login',
], function (
    App,
    Marionette,
    Backbone,
    LoginView
) {
    var Controller = Marionette.Controller.extend({
        execute: function () {
            var view = new LoginView();
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
        }
    });
    App.User.Controllers.Login = new Controller();

    return App.User.Controllers.Login;
});
