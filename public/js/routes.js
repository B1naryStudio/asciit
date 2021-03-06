define([
    'app',
    'marionette',
    'backbone',
    'progressbar',
    'views/menu/menu',
    'stickit',
    'roles'
], function (
    App,
    Marionette,
    Backbone,
    ProgressBar,
    Menu
) {
    // routes
    App.Routes.routes = {
        '': 'questions',
        'questions': 'questions',
        'questions/:id': 'question',
        'login': 'login',
        'logout': 'logout',
        'edit-users': 'users',
        'tags': 'tags',
        'tags/:tag': 'tagSearch',
        'activity': 'activity',
        'question/:question_id/answer/:answer_id': 'question',
        'folders': 'folders',
        'folders/:folder': 'folderSearch',
        'roles': 'roles'
    };

    App.Routes.Router = Marionette.AppRouter.extend({
        appRoutes: App.Routes.routes,
        execute: function (callback, args, name) {
            if (
                App.User.Current &&
                App.User.Current.get('result_role') &&
                App.Roles[App.User.Current.get('result_role')] &&
                App.Roles[App.User.Current.get('result_role')].indexOf(
                    App.helper.getRoteByFunctionName(name)
                ) < 0
            ) {
                Backbone.history.navigate('/', { trigger: true });
                return false;
            }

            if (
                name !== 'login' &&
                App.Routes.isOpen &&
                callback || name === 'login' &&
                callback
            ) {
                App.trigger('select:cancel');
                callback.apply(this, args);

                var duration;

                if (!App.Routes.spinner) {
                    App.Routes.spinner = new ProgressBar.Line('#spinner', {
                        color: '#FCB03C',
                        svgStyle: {
                            height: '3px'
                        }
                    });

                    duration = 2000;
                } else {
                    duration = 4000;
                }

                App.Routes.spinner.animate(0.8, {
                    duration: duration,
                    easing: 'easeOut'
                }, function () {            // Callback on animation finish
                    setTimeout(function () { // Waiting for downloading finish
                        if (App.Routes.spinner) {
                            App.Routes.spinner.destroy();
                        }

                        App.Routes.spinner = null;
                    }, 3000)
                });
            }
        },
        onRoute: function () {
            $('#top-link').hide();
        }
    });

    var API = {
        login: function () {
            require(['controllers/user/init'], function (controller) {
                App.trigger('spinner:check');
                controller.login();
            });
        },
        logout: function () {
            require(['controllers/user/init'], function (controller) {
                App.trigger('spinner:check');
                controller.logout();
            });
        },
        users: function (options) {
            var queryOptions = App.helper.parseUrl(options);

            require(['controllers/user/init'], function (controller) {
                controller.users(
                    queryOptions['search'] ? queryOptions['search'] : '',
                    queryOptions['page'] ? parseInt(queryOptions['page']) : 1
                );
            });
        },
        questions: function (options) {
            require(['controllers/question/init'], function (controller) {
                var queryOptions = App.helper.parseUrl(options);
                controller.questions(
                    queryOptions['search'] ? queryOptions['search'] : '',
                    '',
                    '',
                    queryOptions['page'] ? parseInt(queryOptions['page']) : 1
                );
            });
        },
        question: function (id, answer_id) {
            require(['controllers/question/init'], function (controller) {
                controller.question(id, answer_id);
            });
        },
        questionsAdd: function () {
            require(['controllers/question/init'], function (controller) {
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
        tags: function (data) {
            var tmp = App.helper.parseUrl(data);
            require(['controllers/tag'], function (controller) {
                controller.tags(
                    tmp['search'] ? tmp['search'] : '',
                    tmp['page'] ? parseInt(tmp['page']) : 1
                );
            });
        },
        tagSearch: function (searchQuery) {
            require(['controllers/question/init'], function (controller) {
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
        folders: function (data) {
            require(['controllers/folder'], function (controller) {
                var tmp = App.helper.parseUrl(data);
                controller.getFolders(tmp['page'] ? parseInt(tmp['page']) : 1);
            })
        },
        folderSearch: function (searchQuery) {
            require(['controllers/question/init'], function (controller) {
                controller.questions('', '', $.trim(searchQuery));
            });
        },
        menuShow: function (options) {
            var menu = new Menu({
                model: options.model,
                url: '/app/header',
                success: function () {
                    App.Main.Views.Layout.getRegion('header').show(menu);
                    App.Main.Menu = menu;
                }
            });
        },
        quoteControlShow: function (e) {
            require(['views/quote-control'], function (View) {
                App.Main.Views.Quote = new View();
                App.Main.Views.Layout
                    .getRegion('quoteRegion')
                    .show(App.Main.Views.Quote);
                App.Main.Views.Quote.triggerMethod('control:show', e);
            });
        },
        quoteControlHide: function (e) {
            if (App.Main.Views.Quote) {
                App.Main.Views.Quote.triggerMethod('control:close', e);
                App.Main.Views.Layout.getRegion('quoteRegion').empty();
            }
        },
        roles: function (data) {
            require(['controllers/role'], function (controller) {
                var tmp = App.helper.parseUrl(data);
                controller.getRoles(tmp['page'] ? parseInt(tmp['page']) : 1);
            });
        }
    };

    App.listenTo(App, 'init:openRoutes', function (url) {
        App.Routes.isOpen = true;

        if (!Backbone.history.navigate(url, { trigger: true })) {
            Backbone.history.loadUrl(url);
        }
    });

    App.listenTo(App, 'spinner:login', function () {
        App.Routes.spinner = new ProgressBar.Line('#spinner', {
            color: '#FCB03C',
            svgStyle: {
                height: '3px'
            }
        });

        App.Routes.spinner.animate(0.3, {
            duration: 2000,
            easing: 'easeOut'
        }, 2000);
    });

    App.addInitializer(function() {
        new App.Routes.Router({
            controller: API
        })
    });

    App.listenTo(App, 'spinner:check', function(){
        if (App.queryFlag.length === 0) {
            //Removes a spinner if it exist
            if (App.Routes.spinner) {
                App.Routes.spinner.animate(1.0, {
                    duration: 400
                }, function () {            // Callback on animation finish
                    App.Routes.spinner.destroy();
                    App.Routes.spinner = null;
                });
            }
        }
    });

    App.listenTo(App, 'popup:show', function (data) {
        API.popupShow(data);
    });

    App.listenTo(App, 'popup:close', function (data) {
        API.popupClose(data);
    });

    App.listenTo(App, 'question:add', function () {
        API.questionsAdd();
    });

    App.listenTo(App, 'questions:list', function () {
        if (!Backbone.history.navigate('/', { trigger: true })) {
            API.questions();
        }
    });

    App.listenTo(App, 'paginator:get', function (options) {
        API.paginator(options);
    });

    App.listenTo(App, 'user:authorized', function (user) {
        API.menuShow({ model: user });
    });

    App.listenTo(App, 'select:after', function (e) {
        API.quoteControlShow(e);
    });

    App.listenTo(App, 'select:cancel', function (e) {
        API.quoteControlHide(e);
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

    return App.Routes.Router;
});
