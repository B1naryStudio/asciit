define(['app', 'tpl!views/templates/menu.tpl', 'syphon'], function (App, Tpl) {
    App.module('Menu', function (Menu, App, Backbone, Marionette, $, _) {
        Menu.View = Marionette.ItemView.extend({
            tagName: 'div',
            id: 'menu-view',
            template: Tpl,
            ui: {
                login: '#login',
                questions: '#questions'
            },
            events: {
                'click #login' : 'onNavBooksClicked',
                'click #questions' : 'onNavUsersClicked'
            },
            login: function() {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.login.closest('li').addClass('active');
            },
            question: function() {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.questions.closest('li').addClass('active');
            }
        });
    });
    return new App.Menu.View;
});

