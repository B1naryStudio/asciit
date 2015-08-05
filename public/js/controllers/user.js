define(['app', 'views/user/login'], function (App, View) {
    App.module('User', function (User, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            login: function () {
                require(['models/user'], function () {
                    var view = new View();
                    App.Main.Layout.getRegion('content').show(view);
                    App.trigger('popup:show', {
                        header: {
                            title: 'Login form'
                        },
                        class: 'question-add',
                        contentView: view
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
            logout: function(){
                App.User.Current.destroy({success: function(model, response){
                        delete App.User;
                        Backbone.history.navigate('/', { trigger: true });
                }}, {wait: true});
            }
        });
        User.Controller = new Controller();
    });
    return App.User.Controller;
});
