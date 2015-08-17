define([
    'app',
    'tpl!views/templates/paginator/paginator.tpl'
], function (App, PaginatorTpl) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.Paginator = Marionette.CompositeView.extend({
            id: 'paginator',
            events: {
                'click .next': 'getNextPage',
                'click .prev': 'getPrevPage',
                'click .page': 'goToPage'
            },
            // If there is user, we can render a new template
            getTemplate: function() {
                if (parseInt(this.collection.state['totalPages']) > 1){
                    return PaginatorTpl;
                } else {
                    return _.template('');
                }
            },
            render: function () {
                var template = this.getTemplate();
                var html = template(this.collection.state);
                this.$el.html(html);
                return this;
            },
            getNextPage: function () {
                this.collection.getNextPage();
                this.render();
            },
            getPrevPage: function () {
                this.collection.getPreviousPage();
                this.render();
            },
            goToPage: function (event) {
                this.collection.getPage(parseInt(event.target.innerHTML));
                this.render();
            }
        });
    });
    return App.Question.Views.Paginator;
});
