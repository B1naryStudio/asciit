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
                lang_control: '.lang',
                lang_sel: '.lang-list [data-lang]',
                menu_control: '.menu-list-control',
                menu_list: '.menu-list',
                menu_list_elements: '.menu-list a',
                lang_list: '.lang-list',
                apps_control: '#appsBtn',
                notifications_control: '#notificationBtn'
            },
            events: {
                'click @ui.login' : 'login',
                'click @ui.questions' : 'questions',
                'click @ui.question_add' : 'questionAdd',
                'mouseover @ui.email_button' : 'unfoldMenu',
                'mouseout @ui.email_button' : 'foldMenu',
                'mouseover @ui.lang_control' : 'unfoldMenu',
                'mouseout @ui.lang_control' : 'foldMenu',
                'click @ui.tags': 'tags',
                'click @ui.lang_sel': 'switchLanguage',
                'click @ui.menu_control': 'menu',
                'click @ui.lang_control': 'lang',
                'click @ui.apps_control' : 'customMenuClose',
                'click @ui.notifications_control' : 'customMenuClose',
                'click @ui.menu_list_elements': 'menuSelect'
            },
            menuSelect: function () {
                this.customMenuClose();
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
            switchLanguage: function (e) {
                var currentEl = $(e.currentTarget);
                var lang = currentEl.data('lang');

                if (lang == i18n.lng()) {
                    return;
                }

                i18n.setLng(lang);
                location.reload();
            },
            tags: function () {
                this.$el.find('.navbar-nav .active').removeClass('active');
                this.ui.questions.closest('li').addClass('active');
            },
            onShow: function () {
                this.$el.find('.main-menu').html(this.body);
                headerFunction();
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
            },
            menu: function () {
                this.globalMenuClose();
                if (!this.ui.lang_list.hasClass('invisible')) {
                    this.ui.lang_list.addClass('invisible');
                }
                this.ui.menu_list.toggleClass('invisible');
            },
            lang: function () {
                this.globalMenuClose();
                if (!this.ui.menu_list.hasClass('invisible')) {
                    this.ui.menu_list.addClass('invisible');
                }
                this.ui.lang_list.toggleClass('invisible');
            },
            customMenuClose: function () {
                if (!this.ui.lang_list.hasClass('invisible')) {
                    this.ui.lang_list.addClass('invisible');
                }
                if (!this.ui.menu_list.hasClass('invisible')) {
                    this.ui.menu_list.addClass('invisible');
                }
            },
            globalMenuClose: function () {
                var element = this.$el.find('#notificationBlock');
                if (!element.hasClass('invisible')) {
                    element.addClass('invisible');
                }
                element = this.$el.find('#appsBlock');
                if (!element.hasClass('invisible')) {
                    element.addClass('invisible');
                }
            }
        });
    });
    return App.Main.MenuView;
});