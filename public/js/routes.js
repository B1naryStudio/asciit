define(['app'], function (App) {
    App.module('Routes', function (Routes, App, Backbone, Marionette, $, _) {
        // routes
        Routes.Router = Marionette.AppRouter.extend({
            appRoutes: {
                '': 'questions',
                'questions': 'questions',
                'questions/:id': 'question',
                'login': 'login',
                'logout': 'logout',
                'tags': 'tags',
                'tags/:tag': 'tagSearch'
            },
            execute: function (callback, args, name) {
                if (name !== 'login' && App.Routes.isOpen && callback || name === 'login' && callback) {
                    callback.apply(this, args);
                }
            },
            onRoute: function (name, path, arguments) {
                $('#spinner').addClass('bar');
                //console.log(App.queryFlag);
            }
        });

        var API = {
            login: function () {
                require(['controllers/user'], function (controller) {
                    controller.login();
                });
            },
            logout: function () {
                require(['controllers/user'], function (controller) {
                    controller.logout();
                });
            },
            questions: function (searchQuery) {
                require(['controllers/question'], function (controller) {
                    controller.questions(searchQuery, '');
                });
            },
            question: function (id) {
                require(['controllers/question'], function (controller) {
                    controller.question(id);
                });
            },
            questionsAdd: function () {
                require(['controllers/question'], function (controller) {
                    controller.add();
                });
            },
            popupShow: function (data) {
                require(['controllers/popup'], function (controller) {
                    controller.show(data);
                });
            },
            popupClose: function (data) {
                require(['controllers/popup'], function (controller) {
                    controller.close(data);
                });
            },
            tags: function () {
                require(['controllers/tag'], function (controller) {
                    controller.tags();
                });
            },
            tagSearch: function (searchQuery) {
                require(['controllers/question'], function (controller) {
                    controller.questions('', searchQuery);
                });
            }
        };

        this.listenTo(App, 'init:openRoutes', function (url) {
            App.Routes.isOpen = true;
            if (!Backbone.history.navigate(url, { trigger: true })) {
                Backbone.history.loadUrl(url);
            }
        });

        App.addInitializer(function() {
            new Routes.Router({
                controller: API
            })
        });

        this.listenTo(App, 'spinner:check', function(){
            //debugger;
           if(App.queryFlag.length == 0) {
                $('#spinner').removeClass('bar');
           }
        });

        this.listenTo(App, 'popup:show', function (data) {
            API.popupShow(data);
        });

        this.listenTo(App, 'popup:close', function (data) {
            API.popupClose(data);
        });

        this.listenTo(App, 'question:add', function () {
            API.questionsAdd();
        });

        this.listenTo(App, 'questions:list', function () {
            if (!Backbone.history.navigate('/', { trigger: true })) {
                API.questions();
            }
        });

        $(document).on('click', 'a:not([data-bypass],[target])', function(evt) {
            var href = $(this).attr('href'),
                protocol = this.protocol + '//';

            if (href === '#') {
                evt.preventDefault();
            }

            if (evt.metaKey || evt.ctrlKey) {
                return;
            }

            if (href && href.slice(0, protocol.length) !== protocol &&
                href.indexOf('#') !== 0 &&
                href.indexOf('javascript:') !== 0 &&
                href.indexOf('mailto:') !== 0 &&
                href.indexOf('tel:') !== 0
            ) {
                evt.preventDefault();
                Backbone.history.navigate(href, true);
            }
        });
    });
    return App.Routes.Router;
});
