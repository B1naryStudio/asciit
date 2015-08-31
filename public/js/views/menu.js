define([
    'app',
    'tpl!views/templates/menu.tpl',
    'models/user',
    'syphon'
], function (App, MenuTpl) {
    App.module('Main', function (Main, App, Backbone, Marionette, $, _) {
        Main.MenuView = Marionette.ItemView.extend({
            tagName: 'div',
            template: MenuTpl,
            id: 'menu-view',
            ui: {
                login: '#nav-login',
                questions: '#nav-questions',
                question_add: '#nav-question-add',
                email_button: '.email',
                lang_button: '.lang',
                lang_sel: '.lang [data-lang]'
            },
            events: {
                'click @ui.login' : 'login',
                'click @ui.questions' : 'questions',
                'click @ui.question_add' : 'questionAdd',
                'mouseover @ui.email_button' : 'unfoldMenu',
                'mouseout @ui.email_button' : 'foldMenu',
                'mouseover @ui.lang_button' : 'unfoldMenu',
                'mouseout @ui.lang_button' : 'foldMenu',
                'click @ui.tags': 'tags',
                'click @ui.lang_sel': 'swithLanguage'
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
            unfoldMenu: function (e) {
                var currentEl = $(e.currentTarget);
                currentEl.closest('li').addClass('open');
            },
            foldMenu: function (e) {
                var currentEl = $(e.currentTarget);
                currentEl.closest('li').removeClass('open');
            },
            swithLanguage: function (e) {
                var currentEl = $(e.currentTarget);
                var lang = currentEl.data('lang');

                if (lang == i18n.lng()) return;

                i18n.setLng(lang);
                location.reload();
            },
            tags: function () {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.questions.closest('li').addClass('active');
            },
            onShow: function () {
                this.$el.find('.main-menu').html(this.body);
                headerFubction();
                return this;
            },
            initialize: function (options) {
                var self = this;
                var request = new XMLHttpRequest();
                request.open('GET', options.url, true);
                request.send();
                request.onreadystatechange = function () {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        self.initRender(request.responseText);
                        options.success();
                    }
                };
            },
            initRender: function (body) {
                this.body = body;
            }
        });
    });
    return App.Main.MenuView;
});