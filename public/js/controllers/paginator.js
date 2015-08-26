define([
    'app',
    'views/paginator/paginator',
    'models/paginator'
], function (App, PaginatorView) {
    App.module('Paginator', function (Paginator, App, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            paginator: function (options) {
                $.when(
                    App.request(
                        'paginator:collection',
                        options.collection.state
                    )
                ).done(function (pages) {
                    var paginatorView = new PaginatorView({
                        collection: pages,
                        state: options.collection.state
                    });
                    if (options.success) {
                        options.success(paginatorView);
                    }

                    Paginator.Controller.listenTo(
                        paginatorView,
                        'form:page',
                        function (page) {
                            options.collection.getPage(page);

                            if (options.navigate) {
                                var tmp = window.location.hash;
                                tmp = tmp.split('?');
                                var url_params = [];
                                if (tmp.length > 1) {
                                    url_params = App.helper.parseUrl(tmp[1]);
                                }
                                url_params['page'] = page;
                                Backbone.history.navigate(
                                    tmp[0] + '?' + App.helper.makeUrl(url_params)
                                );
                            }
                            $.when(
                                App.request(
                                    'paginator:collection',
                                    options.collection.state
                                )
                            ).done(function (pages) {
                                paginatorView.collection = pages;
                                paginatorView.info = options.collection.state;
                                paginatorView.render();
                            });
                            if (options.pageChange) {
                                options.pageChange(page);
                            }
                        }
                    );
                });
            }
        });

        Paginator.Controller = new Controller();
    });
    return App.Paginator.Controller;
});
