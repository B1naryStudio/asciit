define(['app', 'views/user/login', 'models/user'], function (App, View) {
    App.module('User', function (User, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            login: function () {
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
            },
            logout: function() {
                if (App.User && App.User.Current) {
                    App.User.Current.destroy({
                        wait: true,
                        success: function(model, response) {
                            delete App.User.Current;
                            Backbone.history.navigate('/login', { trigger: true });
                        },
                        error: function(model, xhr) {
                            console.log(JSON.parse(xhr.responseText));
                        }
                    });
                } else {
                    Backbone.history.navigate('/login', { trigger: true });
                }
            },
            ///////////////////////
            session: function(obj) {
                require(['models/user'], function () {
                    //$.when(App.request('user:session').done(function (model) {
                    //    //console.log(model);
                    //    //App.User.Current = model;
                    //
                    //}).fail(function (errors) {
                    //    //console.log('test');
                    //    //view.triggerMethod('data:invalid', errors);
                    //}));
                    //Backbone.history.navigate('/', { trigger: true });
                        var user = new User.Model();
                        user.fetch({
                        wait: true,
                        success: function (model, response, options) {

                            console.log(model);
                            obj.success();
                        },
                        error: function (model, response, options) {
                            obj.error();
                            //console.log(model);
                        }
                    });

                })
                //console.log(1);
            }
            ////////////////////////
        });
        User.Controller = new Controller();
    });
    return App.User.Controller;
});
