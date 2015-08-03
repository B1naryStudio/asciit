define(['app', 'tpl!views/templates/menu.tpl', 'syphon'], function (App, Tpl) {
    App.module('Menu', function (Menu, App, Backbone, Marionette, $, _) {
        Menu.View = Marionette.ItemView.extend({
            tagName: 'div',
            id: 'menu-view',
            template: Tpl,
            ui: {
                login: '#nav-login',
                questions: '#nav-questions',
                question: '#nav-question'
            },
            events: {
                'click #nav-login' : 'login',
                'click #nav-questions' : 'questions',
                'click #nav-question' : 'question'
            },
            login: function() {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.login.closest('li').addClass('active');
                App.trigger('user:login');
                return false;
            },
            questions: function() {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.questions.closest('li').addClass('active');
                App.trigger('question:collection');
                return false;
            },
            question: function(e) {
                e.preventDefault();
                App.trigger('question:model', 1);
            }
        });
    });
    return new App.Menu.View;
});

