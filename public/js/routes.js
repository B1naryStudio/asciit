define(['app', 'progressbar'], function (App, ProgressBar) {
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
                'tags/:tag': 'tagSearch',
                'activity': 'activity',
                'question/:question_id/answer/:answer_id': 'question',
                'folders': 'folders',
                'folders/:folder': 'folderSearch'
            },
            execute: function (callback, args, name) {
                if (
                    name !== 'login' && App.Routes.isOpen &&
                    callback || name === 'login' && callback
                ) {
                    callback.apply(this, args);
                    if (Routes.spinner) {
                        Routes.spinner.destroy();
                    }
                    Routes.spinner = new ProgressBar.Line('#spinner', {
                        color: '#FCB03C',
                        svgStyle: {
                            height: '3px'
                        }
                    });

                    Routes.spinner.animate(1.0, {
                        duration: 2000,
                        easing: 'easeOut'
                    }, function () {            // Callback on animation finish
                        Routes.spinner.destroy();
                        Routes.spinner = null;
                    });
                }
            },
            onRoute: function () {
                $('#top-link').hide();
            }
        });

        var API = {
            login: function () {
                require(['controllers/user'], function (controller) {
                    App.trigger('spinner:check');
                    controller.login();
                });
            },
            logout: function () {
                require(['controllers/user'], function (controller) {
                    App.trigger('spinner:check');
                    controller.logout();
                });
            },
            questions: function (data) {
                var self = this;
                require(['controllers/question'], function (controller) {
                    var tmp = self.parseUrl(data);
                    controller.questions(
                        tmp['search'] ? tmp['search'] : '',
                        '',
                        '',
                        tmp['page'] ? parseInt(tmp['page']) : 1
                    );
                });
            },
            question: function (id, answer_id) {
                require(['controllers/question'], function (controller) {
                    controller.question(id, answer_id);
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
                    controller.questions('', $.trim(searchQuery), '');
                });
            },
            activity: function () {
                require(['controllers/activity'], function (controller) {
                    controller.activity();
                });
            },
            paginator: function (options) {
                require(['controllers/paginator'], function (controller) {
                    controller.paginator(options);
                });
            },
            folders: function () {
                require(['controllers/folder'], function (controller) {
                    controller.getFolders();
                })
            },
            folderSearch: function (searchQuery) {
                require(['controllers/question'], function (controller) {
                    controller.questions('', '', $.trim(searchQuery));
                });
            },
            parseUrl: function (url) {
                var data = {};
                if (url) {
                    var tmp = url.split('&');
                    var tmp2;
                    for (var i = 0; i < tmp.length; i++) {
                        tmp2 = tmp[i].split('=');
                        if (tmp2.length === 2) {
                            data[tmp2[0]] = tmp2[1];
                        } else {
                            data['search'] = tmp2[0];
                        }
                    }
                }
                return data;
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
            if (App.queryFlag.length === 0) {
                //Removes a spinner if it exist
                if (Routes.spinner) {
                    Routes.spinner.animate(1.0, {
                        duration: 400
                    }, function () {            // Callback on animation finish
                        Routes.spinner.destroy();
                        Routes.spinner = null;
                    });
                }
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

        this.listenTo(App, 'paginator:get', function (options) {
            API.paginator(options);
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
