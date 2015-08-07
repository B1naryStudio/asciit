define([
    'app',
    'tpl!views/templates/question/paginator.tpl'
], function (App, PaginatorTpl) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.Paginator = Marionette.View.extend({
            id: 'paginator',
            template: PaginatorTpl,
            events: {
                "click .next": "getNextPage",
                "click .prev": "getPrevPage",
                "click .page": "goToPage"
            },
            render: function () {
                console.log(this.collection.state);
                var html = this.template(this.collection.state);
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
