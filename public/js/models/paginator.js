define(['app', 'backbone'], function (App, Backbone) {
    App.Paginator.Models.Model = Backbone.Model.extend({
        defaults: {
            title: '',
            state: '',
            page: 0
        }
    });

    App.Paginator.Models.Collection = Backbone.Collection.extend({
        model: App.Paginator.Models.Model,
        sortKey: 'updated_at',
        order: 'desc',
        links_one_side: 2
    });

    var API = {
        paginatorCollection: function (options) {
            var pages = new App.Paginator.Models.Collection();
            var defer = $.Deferred();

            if (options.totalPages > 1) {
                pages.add([
                    {
                        title: '&laquo;',
                        page: 0,
                        type: 'prev',
                        is_disabled: options.currentPage === 1
                    },
                    {
                        title: 1,
                        page: 1,
                        type: options.currentPage === 1 ? 'active' : 'page'
                    }
                ]);

                if (options.currentPage - pages.links_one_side - 1 > 1) {
                    pages.add([
                        {
                            title: '...',
                            page: 0,
                            type: 'more'
                        }
                    ]);
                }

                var start = options.currentPage - pages.links_one_side;
                if (start <= 1) {
                    start = 2;
                }

                if (
                    options.totalPages - options.currentPage <
                    pages.links_one_side
                ) {
                    start = options.totalPages -
                        pages.links_one_side * 2 - 1;
                    if (start < 2) {
                        start = 2;
                    }
                }

                var page;
                for (
                    var i = start;
                    i < start + pages.links_one_side * 2 + 1 &&
                    i < options.totalPages;
                    i++
                ) {
                    page = { title: i, page: i, type: 'page' };
                    if (i === options.currentPage) {
                        page.type = 'active';
                    }
                    pages.add([
                        page
                    ]);
                }

                if (
                    options.totalPages -
                    options.currentPage -
                    pages.links_one_side - 1 > 1
                ) {
                    pages.add([
                        {
                            title: '...',
                            page: 0,
                            type: 'more'
                        }
                    ]);
                }

                pages.add([
                    {
                        title: options.lastPage,
                        page: options.lastPage,
                        type: options.currentPage === options.lastPage ?
                            'active' : 'page'
                    },
                    {
                        title: '&raquo;',
                        page: 0,
                        type: 'next',
                        is_disabled: options.currentPage === options.lastPage
                    }
                ]);
            }

            defer.resolve(pages);
            return defer.promise();
        }
    };

    App.reqres.setHandler('paginator:collection', function (options) {
        return API.paginatorCollection(options);
    });
});
