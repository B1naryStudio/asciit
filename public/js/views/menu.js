define(['app', 'tpl!views/templates/menu.tpl', 'syphon'], function (App, Tpl) {
    App.module('Menu', function (Menu, App, Backbone, Marionette, $, _) {
        Menu.View = Marionette.ItemView.extend({
            tagName: 'div',
            id: 'menu-view',
            template: Tpl,
            ui: {
                login: '#nav-login',
                questions: '#nav-questions',
                question_add: '#nav-question-add'
            },
            events: {
                'click @ui.login' : 'login',
                'click @ui.question' : 'question',
                'click @ui.question_add' : 'questionAdd',
                'click @ui.tags' : 'tags'
            },
            login: function () {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.login.closest('li').addClass('active');
            },
            question: function () {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.questions.closest('li').addClass('active');
            },
            questionAdd: function () {
                App.trigger('question:add');
                return false;
            },
            tags: function () {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.questions.closest('li').addClass('active');
            }
        });
    });
    return new App.Menu.View;
});