define([
    'app',
    'tpl!views/templates/menu.tpl',
    'tpl!views/templates/menu-unauthorized.tpl',
    'models/user',
    'syphon'
], function (App, MenuTpl, MenuUnauthTpl) {
    App.module('Main', function (Main, App, Backbone, Marionette, $, _) {
        var MenuView = Marionette.ItemView.extend({
            tagName: 'div',
            id: 'menu-view',
            ui: {
                login: '#nav-login',
                questions: '#nav-questions',
                question_add: '#nav-question-add',
                email_button: '.email'
            },
            events: {
                'click @ui.login' : 'login',
                'click @ui.questions' : 'questions',
                'click @ui.question_add' : 'questionAdd',
                'mouseover @ui.email_button' : 'unfoldMenu',
                'mouseout @ui.email_button' : 'foldMenu',
                'click @ui.tags' : 'tags'
            },
            // If there is user, we can render a new template
            getTemplate: function() {
                if (this.model.get('id')) {
                    return MenuTpl;
                } else {
                    return MenuUnauthTpl;
                }
            },
            login: function () {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.login.closest('li').addClass('active');
            },
            questions: function () {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.questions.closest('li').addClass('active');
            },
            questionAdd: function () {
                App.trigger('question:add');
                return false;
            },
            unfoldMenu: function () {
                this.ui.email_button.closest('li').addClass('open');
            },
            foldMenu: function () {
                this.ui.email_button.closest('li').removeClass('open');
            },
            onUserAuthorized: function (user) {
                this.model = user;
                this.render();
            },
            onUserLeave: function () {
                this.model.clear({silent: true});
                this.render();
            },
            tags: function () {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.questions.closest('li').addClass('active');
            }
        });
        Main.Menu = new MenuView({model: new App.User.Model});
    });
    return App.Main.Menu;
});