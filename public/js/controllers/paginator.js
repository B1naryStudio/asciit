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
                        }
                    );
                });
            }
        });

        Paginator.Controller = new Controller();
    });
    return App.Paginator.Controller;
});
